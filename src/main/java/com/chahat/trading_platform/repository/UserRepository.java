package com.chahat.trading_platform.repository;

import com.chahat.trading_platform.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    public User findUserByEmail(String email);
}
