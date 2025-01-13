package com.chahat.trading_platform.service;

import com.chahat.trading_platform.model.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    public User findUserByJWT(String jwt);
    public User findUserByEmail(String email);
    public User findUserById(Long id);
    public User enableTwoFactorAuth(User user);
    public User updatePassword(User user, String newPassword);

}
