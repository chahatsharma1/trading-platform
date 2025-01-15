package com.chahat.trading_platform.controllers;

import com.chahat.trading_platform.domain.VerificationType;
import com.chahat.trading_platform.model.ForgotPasswordToken;
import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.model.VerificationCode;
import com.chahat.trading_platform.service.EmailService;
import com.chahat.trading_platform.service.ForgotPasswordService;
import com.chahat.trading_platform.service.UserService;
import com.chahat.trading_platform.service.VerificationCodeService;
import com.chahat.trading_platform.utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private VerificationCodeService verificationCodeService;

    @Autowired
    private ForgotPasswordService forgotPasswordService;

    @GetMapping("users/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwt ) throws Exception {
        User user = userService.findUserByJWT(jwt);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PatchMapping("users/enable-two-factor/verify/{otp}")
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

    @PostMapping("users/verification/{verificationType}/send-otp")
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

    @PostMapping("users/forgot-password/send-otp")
    public ResponseEntity<String> sendForgotPasswordOTP(@RequestHeader("Authorization") String jwt, @PathVariable VerificationType verificationType) throws Exception {
        User user = userService.findUserByJWT(jwt);

        String otp = OtpUtils.generateOtp();

        UUID uuid = UUID.randomUUID();
        String id = uuid.toString();

        ForgotPasswordToken token = forgotPasswordService.findByUser(user.getId());
        return new ResponseEntity<>("OTP Successfully Sent", HttpStatus.OK);

    }
}
