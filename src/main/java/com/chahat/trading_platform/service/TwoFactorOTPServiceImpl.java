package com.chahat.trading_platform.service;

import com.chahat.trading_platform.model.TwoFactorOTP;
import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.repository.TwoFactorOTPRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class TwoFactorOTPServiceImpl implements TwoFactorOTPService {

    @Autowired
    private TwoFactorOTPRepository twoFactorOTPRepository;

    @Override
    public TwoFactorOTP createTwoFactorOTP(User user, String otp, String jwt) {
        return null;
    }

    @Override
    public TwoFactorOTP findByUser(long userID) {
        return null;
    }

    @Override
    public TwoFactorOTP findByID(String id) {
        return null;
    }

    @Override
    public boolean verifyTwoFactorOTP(TwoFactorOTP twoFactorOTP, String otp) {
        return false;
    }

    @Override
    public void deleteTwoFactorOTP(TwoFactorOTP twoFactorOTP) {

    }
}
