package com.chahat.trading_platform.service;

import com.chahat.trading_platform.config.JWTProvider;
import com.chahat.trading_platform.domain.VerificationType;
import com.chahat.trading_platform.model.TwoFactorAuth;
import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.repository.UserRepository;
import com.chahat.trading_platform.request.UpdateUserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User findUserByJWT(String jwt) throws Exception {
        String email = JWTProvider.getEmailFromToken(jwt);
        User user = userRepository.findUserByEmail(email);

        if (user == null){
            throw new Exception("User Not Found");
        }
        return user;
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepository.findUserByEmail(email);

        if (user == null){
            throw new Exception("User Not Found");
        }
        return user;
    }

    @Override
    public User enableTwoFactorAuth(VerificationType verificationType, String sendTo, User user) {
        TwoFactorAuth twoFactorAuth = new TwoFactorAuth();
        twoFactorAuth.setEnabled(true);
        twoFactorAuth.setSendTo(verificationType);

        user.setTwoFactorAuth(twoFactorAuth);

        return userRepository.save(user);
    }

    @Override
    public void disableTwoFactorAuth(User user) {
        TwoFactorAuth twoFactorAuth = new TwoFactorAuth();
        twoFactorAuth.setEnabled(false);
        user.setTwoFactorAuth(twoFactorAuth);
        userRepository.save(user);
    }

    @Override
    public void updatePassword(User user, String newPassword) {
        user.setPassword(newPassword);
        userRepository.save(user);
    }

    @Override
    public User updateUser(UpdateUserRequest request, User user){
        user.setDob(request.getDob());
        user.setNationality(request.getNationality());
        user.setAddress(request.getAddress());
        user.setCity(request.getCity());
        user.setPostcode(request.getPostcode());
        user.setCountry(request.getCountry());

        return userRepository.save(user);
    }
}
