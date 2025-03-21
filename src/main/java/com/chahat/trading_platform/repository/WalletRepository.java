package com.chahat.trading_platform.repository;

import com.chahat.trading_platform.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalletRepository extends JpaRepository<Wallet, Long > {

    Wallet findWalletByUserId(Long Id);
}
