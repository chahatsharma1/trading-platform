package com.chahat.trading_platform.service;

import com.chahat.trading_platform.domain.VerificationType;
import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.request.UpdateUserRequest;

import java.util.List;

public interface UserService {

    User findUserByJWT(String jwt) throws Exception;
    User findUserByEmail(String email) throws Exception;
    User enableTwoFactorAuth(VerificationType verificationType, String sendTo, User user);
    void disableTwoFactorAuth(User user);
    void updatePassword(User user, String newPassword);
    User updateUser(UpdateUserRequest request, User user);
    List<User> getAllUsers();
}