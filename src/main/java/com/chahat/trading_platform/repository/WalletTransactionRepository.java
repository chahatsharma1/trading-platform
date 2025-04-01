package com.chahat.trading_platform.repository;

import com.chahat.trading_platform.model.Wallet;
import com.chahat.trading_platform.model.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Long>{
    List<WalletTransaction> findByWallet(Wallet wallet);
}
