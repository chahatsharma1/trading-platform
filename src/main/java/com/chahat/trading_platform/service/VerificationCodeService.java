package com.chahat.trading_platform.service;

import com.chahat.trading_platform.domain.VerificationType;
import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.model.VerificationCode;

public interface VerificationCodeService {

    VerificationCode sendVerificationCode(User user, VerificationType verificationType);
    VerificationCode getVerificationCodeById(Long Id) throws Exception;
    VerificationCode getVerificationCodeByUser(Long userId);
    void deleteVerificationCode(VerificationCode verificationCode);
}
