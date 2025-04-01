package com.chahat.trading_platform.service;

import com.chahat.trading_platform.domain.WalletTransactionType;
import com.chahat.trading_platform.model.Wallet;
import com.chahat.trading_platform.model.WalletTransaction;
import com.chahat.trading_platform.repository.WalletTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService{

    @Autowired
    private WalletTransactionRepository walletTransactionRepository;

    @Override
    @Transactional
    public WalletTransaction createTransaction(Wallet wallet, BigDecimal amount, WalletTransactionType transactionType) {
        WalletTransaction transaction = new WalletTransaction();
        transaction.setWallet(wallet);
        transaction.setAmount(amount);
        transaction.setWalletTransactionType(transactionType);
        return walletTransactionRepository.save(transaction);
    }

    @Override
    public List<WalletTransaction> getTransactionsByWallet(Wallet wallet) {
        return walletTransactionRepository.findByWallet(wallet);
    }
}
