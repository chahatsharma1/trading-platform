package com.chahat.trading_platform.service;

import com.chahat.trading_platform.model.Order;
import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.model.Wallet;

import java.math.BigDecimal;

public interface WalletService {

    Wallet getUserWallet(User user);
    Wallet addBalance(Wallet wallet, Long amount);
    Wallet deductBalance(Wallet wallet, Long amount) throws Exception;
    Wallet findByID(Long id) throws Exception;
    Wallet walletToWalletTransaction(User sender, Wallet receiver, BigDecimal amount) throws Exception;
    Wallet payOrderPayment(Order order, User user) throws Exception;
}