package com.chahat.trading_platform.service;

import com.chahat.trading_platform.domain.VerificationType;
import com.chahat.trading_platform.model.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    public User findUserByJWT(String jwt) throws Exception;
    public User findUserByEmail(String email) throws Exception;
    public User findUserById(Long id) throws Exception;
    public User enableTwoFactorAuth(VerificationType verificationType, String sendTo, User user);
    public User updatePassword(User user, String newPassword);

}
