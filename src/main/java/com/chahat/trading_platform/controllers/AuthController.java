package com.chahat.trading_platform.controllers;

import com.chahat.trading_platform.config.JWTProvider;
import com.chahat.trading_platform.model.TwoFactorOTP;
import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.response.AuthResponse;
import com.chahat.trading_platform.repository.UserRepository;
import com.chahat.trading_platform.service.CustomUserDetailsService;
import com.chahat.trading_platform.service.EmailService;
import com.chahat.trading_platform.service.TwoFactorOTPService;
import com.chahat.trading_platform.service.WatchListService;
import com.chahat.trading_platform.utils.OtpUtils;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private TwoFactorOTPService twoFactorOTPService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private WatchListService watchListService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> register(@RequestBody User user) throws Exception {

        User emailExist = userRepository.findUserByEmail(user.getEmail());
        if (emailExist != null){
            throw new Exception("User already exist with this email, try again with different email");
        }

        User newUser = new User();
        newUser.setFullName(user.getFullName());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword());
        User savedUser = userRepository.save(newUser);

        watchListService.createList(savedUser);

        Authentication auth = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());

        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwt = JWTProvider.generateToken(auth);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setStatus(true);
        authResponse.setMessage("Registered Successfully");

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> login(@RequestBody User user) throws MessagingException {
        String userName = user.getEmail();
        String password = user.getPassword();

        Authentication auth = authenticate(userName, password);

        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwt = JWTProvider.generateToken(auth);

        User authUser = userRepository.findUserByEmail(user.getEmail());

        if (authUser.getTwoFactorAuth().isEnabled()){
            AuthResponse authResponse = new AuthResponse();
            authResponse.setMessage("Two Factor is Enabled");
            authResponse.setTwoFactorAuthEnable(true);
            String otp = OtpUtils.generateOtp();

            TwoFactorOTP oldTwoFactorOTP = twoFactorOTPService.findByUser(authUser.getId());
            if (oldTwoFactorOTP != null){
                twoFactorOTPService.deleteTwoFactorOTP(oldTwoFactorOTP);
            }
            TwoFactorOTP twoFactorOTP = twoFactorOTPService.createTwoFactorOTP(authUser, otp, jwt);

            emailService.sendOtpMail(authUser.getEmail(), otp);
            authResponse.setSession(twoFactorOTP.getId());
            return new ResponseEntity<>(authResponse, HttpStatus.ACCEPTED);
        }

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setStatus(true);
        authResponse.setMessage("Login Successfully");

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    private Authentication authenticate(String userName, String password){

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(userName);

        if (userDetails == null){
            throw new BadCredentialsException("User Does Not Exist");
        }

        if (!password.equals(userDetails.getPassword())){
            throw new BadCredentialsException("Wrong Password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());
    }

    @PostMapping("/two-factor/otp/{otp}")
    public ResponseEntity<AuthResponse> verifyLoginOtp(@PathVariable String otp, @RequestParam String id) throws Exception {
        TwoFactorOTP twoFactorOTP = twoFactorOTPService.findByID(id);

        AuthResponse authResponse = new AuthResponse();

        if (twoFactorOTPService.verifyTwoFactorOTP(twoFactorOTP, otp)){
            authResponse.setMessage("Two Factor Authentication Verified");
            authResponse.setJwt(twoFactorOTP.getJwt());
            authResponse.setTwoFactorAuthEnable(true);
            return new ResponseEntity<>(authResponse, HttpStatus.OK);

        }

        authResponse.setMessage("Invalid OTP. Please try again.");
        authResponse.setTwoFactorAuthEnable(false);
        return new ResponseEntity<>(authResponse, HttpStatus.UNAUTHORIZED);
    }
}
