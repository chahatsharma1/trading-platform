package com.chahat.trading_platform.service;

import com.chahat.trading_platform.model.User;

public class UserServiceImpl implements UserService{

    @Override
    public User findUserByJWT(String jwt) {
        return null;
    }

    @Override
    public User findUserByEmail(String email) {
        return null;
    }

    @Override
    public User findUserById(Long id) {
        return null;
    }

    @Override
    public User enableTwoFactorAuth(User user) {
        return null;
    }

    @Override
    public User updatePassword(User user, String newPassword) {
        return null;
    }
}
