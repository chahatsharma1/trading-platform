package com.chahat.trading_platform.service;

import com.chahat.trading_platform.model.TwoFactorOTP;
import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.repository.TwoFactorOTPRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.UUID;

@Service
public class TwoFactorOTPServiceImpl implements TwoFactorOTPService {

    @Autowired
    private TwoFactorOTPRepository twoFactorOTPRepository;

    @Override
    public TwoFactorOTP createTwoFactorOTP(User user, String otp, String jwt) {
        UUID uuid = UUID.randomUUID();

        String id = uuid.toString();

        TwoFactorOTP twoFactorOTP = new TwoFactorOTP();
        twoFactorOTP.setId(id);
        twoFactorOTP.setOTP(otp);
        twoFactorOTP.setUser(user);
        twoFactorOTP.setJwt(jwt);
        return twoFactorOTPRepository.save(twoFactorOTP);
    }

    @Override
    public TwoFactorOTP findByUser(long userID) {
        return twoFactorOTPRepository.findByUserId(userID);
    }

    @Override
    public TwoFactorOTP findByID(String id) {
        Optional<TwoFactorOTP> optionalTwoFactorOTP = twoFactorOTPRepository.findById(id);
        return optionalTwoFactorOTP.orElse(null);
    }

    @Override
    public boolean verifyTwoFactorOTP(TwoFactorOTP twoFactorOTP, String otp) {
        return twoFactorOTP.getOTP().equals(otp);
    }

    @Override
    public void deleteTwoFactorOTP(TwoFactorOTP twoFactorOTP) {
        twoFactorOTPRepository.delete(twoFactorOTP);
    }
}
