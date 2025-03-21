package com.chahat.trading_platform.service;

import com.chahat.trading_platform.model.Order;
import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.model.Wallet;

public interface WalletService {

    Wallet getUserWallet(User user);
    Wallet addBalance(Wallet wallet, Long amount);
    Wallet findByID(Long id) throws Exception;
    Wallet walletToWalletTransaction(User sender, Wallet receiver, Long amount) throws Exception;
    Wallet payOrderPayment(Order order, User user) throws Exception;

}
