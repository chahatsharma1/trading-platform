package com.chahat.trading_platform.service;

import com.chahat.trading_platform.domain.VerificationType;
import com.chahat.trading_platform.model.ForgotPasswordToken;
import com.chahat.trading_platform.model.User;

public interface ForgotPasswordService {

    ForgotPasswordToken createToken(User user, String otp, VerificationType verificationType, String sendTo);

    void save(ForgotPasswordToken token);

    ForgotPasswordToken findById(String Id);

    ForgotPasswordToken findByUser(Long Id);

    void deleteToken(ForgotPasswordToken token);
}
