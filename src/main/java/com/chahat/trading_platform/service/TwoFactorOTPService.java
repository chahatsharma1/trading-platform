package com.chahat.trading_platform.service;

import com.chahat.trading_platform.model.TwoFactorOTP;
import com.chahat.trading_platform.model.User;

public interface TwoFactorOTPService {

    TwoFactorOTP createTwoFactorOTP(User user, String otp, String jwt);

    TwoFactorOTP findByUser(long userID);

    TwoFactorOTP findByID(String id);

    boolean verifyTwoFactorOTP(TwoFactorOTP twoFactorOTP, String otp);

    void deleteTwoFactorOTP(TwoFactorOTP twoFactorOTP);
}
