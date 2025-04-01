package com.chahat.trading_platform.service;

import com.chahat.trading_platform.domain.WalletTransactionType;
import com.chahat.trading_platform.model.Wallet;
import com.chahat.trading_platform.model.WalletTransaction;

import java.math.BigDecimal;
import java.util.List;

public interface TransactionService {
    WalletTransaction createTransaction(Wallet wallet, BigDecimal amount, WalletTransactionType transactionType);
    List<WalletTransaction> getTransactionsByWallet(Wallet wallet);
}
