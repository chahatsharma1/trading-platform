package com.chahat.trading_platform.service;

import com.chahat.trading_platform.domain.VerificationType;
import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.model.VerificationCode;
import com.chahat.trading_platform.repository.VerificationCodeRepository;
import com.chahat.trading_platform.utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class VerificationCodeServiceImpl implements VerificationCodeService {

    @Autowired
    private VerificationCodeRepository verificationCodeRepository;

    @Override
    public VerificationCode sendVerificationCode(User user, VerificationType verificationType) {
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setOtp(OtpUtils.generateOtp());
        verificationCode.setUser(user);
        verificationCode.setVerificationType(verificationType);

        return verificationCodeRepository.save(verificationCode);
    }

    @Override
    public VerificationCode getVerificationCodeById(Long Id) throws Exception {
        Optional<VerificationCode> verificationCode = verificationCodeRepository.findById(Id);

        if (verificationCode.isPresent()){
            return verificationCode.get();
        }
        throw new Exception("Verification Code Not Found");
    }

    @Override
    public VerificationCode getVerificationCodeByUser(Long userId) {
        return verificationCodeRepository.findByUserId(userId);
    }

    @Override
    public void deleteVerificationCode(VerificationCode verificationCode) {
        verificationCodeRepository.delete(verificationCode);
    }
}
