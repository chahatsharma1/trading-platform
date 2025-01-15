package com.chahat.trading_platform.service;

import com.chahat.trading_platform.domain.VerificationType;
import com.chahat.trading_platform.model.User;

public interface UserService {

    User findUserByJWT(String jwt) throws Exception;
    User findUserByEmail(String email) throws Exception;
    User findUserById(Long id) throws Exception;
    User enableTwoFactorAuth(VerificationType verificationType, String sendTo, User user);
    User updatePassword(User user, String newPassword);
}