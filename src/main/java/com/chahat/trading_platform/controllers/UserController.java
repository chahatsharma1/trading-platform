package com.chahat.trading_platform.controllers;

import com.chahat.trading_platform.domain.VerificationType;
import com.chahat.trading_platform.model.ForgotPasswordToken;
import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.model.VerificationCode;
import com.chahat.trading_platform.request.ForgotPasswordRequest;
import com.chahat.trading_platform.request.UpdateUserRequest;
import com.chahat.trading_platform.request.VerifyOTPRequest;
import com.chahat.trading_platform.response.ApiResponse;
import com.chahat.trading_platform.response.AuthResponse;
import com.chahat.trading_platform.service.EmailService;
import com.chahat.trading_platform.service.ForgotPasswordService;
import com.chahat.trading_platform.service.UserService;
import com.chahat.trading_platform.service.VerificationCodeService;
import com.chahat.trading_platform.utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/users")
@PreAuthorize("hasRole('USER')")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private VerificationCodeService verificationCodeService;

    @Autowired
    private ForgotPasswordService forgotPasswordService;

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwt ) throws Exception {
        User user = userService.findUserByJWT(jwt);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PatchMapping("/enable-two-factor/verify/{otp}")
    public ResponseEntity<User> enableTwoFactorAuth(@RequestHeader("Authorization") String jwt, @PathVariable String otp) throws Exception {
        User user = userService.findUserByJWT(jwt);

        VerificationCode verificationCode = verificationCodeService.getVerificationCodeByUser(user.getId());

        String sendTo = verificationCode.getVerificationType().equals(VerificationType.EMAIL)
                ? verificationCode.getEmail() : verificationCode.getMobile();

        boolean isVerified = verificationCode.getOtp().equals(otp);
        if (isVerified){
            User updateUser = userService.enableTwoFactorAuth(verificationCode.getVerificationType(), sendTo, user);
            verificationCodeService.deleteVerificationCode(verificationCode);
            return new ResponseEntity<>(updateUser, HttpStatus.OK);
        }
        throw new Exception("Wrong OTP");
    }

    @PostMapping("/verification/{verificationType}/send-otp")
    public ResponseEntity<String> sendVerification(@RequestHeader("Authorization") String jwt, @PathVariable VerificationType verificationType) throws Exception {
        User user = userService.findUserByJWT(jwt);

        VerificationCode verificationCode = verificationCodeService.getVerificationCodeByUser(user.getId());
        if (verificationCode == null){
            verificationCode = verificationCodeService.sendVerificationCode(user, verificationType);
        }

        if (verificationType.equals(VerificationType.EMAIL)){
            emailService.sendOtpMail(user.getEmail(), verificationCode.getOtp());
        }
        return new ResponseEntity<>("OTP Successfully Sent", HttpStatus.OK);
    }

    @PostMapping("/disable-two-factor")
    public ResponseEntity<String> disableTwoFactorAuth(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJWT(jwt);
        userService.disableTwoFactorAuth(user);
        return new ResponseEntity<>("Two Factor Disabled", HttpStatus.OK);
    }


    @PostMapping("/forgot-password/send-otp")
    public ResponseEntity<AuthResponse> sendForgotPasswordOTP(@RequestBody ForgotPasswordRequest req) throws Exception {
        User user = userService.findUserByEmail(req.getSendTo());

        String otp = OtpUtils.generateOtp();


        ForgotPasswordToken token = forgotPasswordService.findByUser(user.getId());
        if (token == null){
            token = forgotPasswordService.createToken(user, otp, req.getVerificationType(), req.getSendTo());
        } else{
            token.setOtp(otp);
            token.setVerificationType(req.getVerificationType());
            token.setSendTo(req.getSendTo());
            forgotPasswordService.save(token);
        }

        if (req.getVerificationType().equals(VerificationType.EMAIL)){
            emailService.sendOtpMail(user.getEmail(), token.getOtp());
        }

        AuthResponse authResponse = new AuthResponse();
        authResponse.setSession(token.getId());
        authResponse.setMessage("Forgot Password OTP Successfully Sent");

        return new ResponseEntity<>(authResponse, HttpStatus.OK);

    }

    @PatchMapping("/forgot-password/verify/{otp}")
    public ResponseEntity<ApiResponse> forgotPasswordVerification(@RequestParam String id,
                                                                   @RequestBody VerifyOTPRequest request) throws Exception {

        ForgotPasswordToken token = forgotPasswordService.findById(id);

        boolean isVerified = request.getOtp().equals(token.getOtp());
        if (isVerified){
            userService.updatePassword(token.getUser(), request.getNewPassword());
            ApiResponse apiResponse = new ApiResponse();
            apiResponse.setMessage("Password Successfully Changed");
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        }
        throw new Exception("Wrong OTP");
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUserProfile(@RequestBody UpdateUserRequest request, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJWT(jwt);
        User updatedUser = userService.updateUser(request, user);
        return ResponseEntity.ok(updatedUser);
    }
}
