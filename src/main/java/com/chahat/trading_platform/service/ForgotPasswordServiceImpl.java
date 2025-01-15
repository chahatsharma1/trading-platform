package com.chahat.trading_platform.service;

import com.chahat.trading_platform.domain.VerificationType;
import com.chahat.trading_platform.model.ForgotPasswordToken;
import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.repository.ForgotPasswordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ForgotPasswordServiceImpl implements ForgotPasswordService{

    @Autowired
    private ForgotPasswordRepository forgotPasswordRepository;

    @Override
    public ForgotPasswordToken createToken(User user, String id, String otp, VerificationType verificationType, String sendTo) {
        ForgotPasswordToken token = new ForgotPasswordToken();
        token.setUser(user);
        token.setSendTo(sendTo);
        token.setVerificationType(verificationType);
        token.setOtp(otp);
        token.setId(id);
        return forgotPasswordRepository.save(token);
    }

    @Override
    public ForgotPasswordToken findById(String Id) {
        Optional<ForgotPasswordToken> token = forgotPasswordRepository.findById(Id);
        return token.orElse(null);
    }

    @Override
    public ForgotPasswordToken findByUser(Long Id) {
        return forgotPasswordRepository.findByUserId(Id);
    }

    @Override
    public void deleteToken(ForgotPasswordToken token) {
        forgotPasswordRepository.delete(token);
    }
}
