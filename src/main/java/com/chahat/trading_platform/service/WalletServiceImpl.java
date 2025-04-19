package com.chahat.trading_platform.service;

import com.chahat.trading_platform.domain.OrderType;
import com.chahat.trading_platform.domain.WalletTransactionType;
import com.chahat.trading_platform.model.Order;
import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.model.Wallet;
import com.chahat.trading_platform.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.Optional;

@Service
public class WalletServiceImpl implements WalletService{

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private TransactionService transactionService;

    @Override
    public Wallet getUserWallet(User user) {
        Wallet wallet = walletRepository.findWalletByUserId(user.getId());
        if (wallet == null){
            wallet = new Wallet();
            wallet.setUser(user);
            walletRepository.save(wallet);
        }
        return wallet;
    }

    @Override
    public Wallet addBalance(Wallet wallet, Long amount) {
        BigDecimal balance = wallet.getBalance();
        BigDecimal newBalance = balance.add(BigDecimal.valueOf(amount));
        wallet.setBalance(newBalance);
        walletRepository.save(wallet);

        transactionService.createTransaction(wallet,BigDecimal.valueOf(amount), WalletTransactionType.ADD_MONEY);

        return wallet;
    }

    @Override
    public Wallet deductBalance(Wallet wallet, Long amount) throws Exception {
        BigDecimal currentBalance = wallet.getBalance();
        BigDecimal deduction = BigDecimal.valueOf(amount);

        if (currentBalance.compareTo(deduction) < 0) {
            throw new Exception("Insufficient balance for withdrawal");
        }

        wallet.setBalance(currentBalance.subtract(deduction));
        walletRepository.save(wallet);

        transactionService.createTransaction(wallet, deduction, WalletTransactionType.WITHDRAWAL);

        return wallet;
    }


    @Override
    public Wallet findByID(Long id) throws Exception {
        Optional<Wallet> wallet = walletRepository.findById(id);
        if (wallet.isPresent()){
            return wallet.get();
        }
        throw new Exception("Wallet Not Found");
    }

    @Override
    public Wallet walletToWalletTransaction(User sender, Wallet receiver, BigDecimal amount) throws Exception {
        Wallet senderWallet = getUserWallet(sender);

        if (senderWallet.getBalance().compareTo(amount) < 0){
            throw new Exception("Insufficient Balance");
        }

        senderWallet.setBalance(senderWallet.getBalance().subtract(amount));
        walletRepository.save(senderWallet);

        receiver.setBalance(receiver.getBalance().add(amount));
        walletRepository.save(receiver);

        transactionService.createTransaction(senderWallet, amount, WalletTransactionType.WALLET_TRANSFER);
        transactionService.createTransaction(receiver, amount, WalletTransactionType.WALLET_TRANSFER);

        return senderWallet;
    }

    @Override
    public Wallet payOrderPayment(Order order, User user) throws Exception {
        Wallet wallet = getUserWallet(user);
        if (order.getOrderType().equals(OrderType.BUY)) {
            if (wallet.getBalance().compareTo(order.getPrice()) < 0) {
                throw new Exception("Insufficient Fund");
            }
            wallet.setBalance(wallet.getBalance().subtract(order.getPrice()));
            transactionService.createTransaction(wallet, order.getPrice(), WalletTransactionType.BUY_ASSET);
        } else {
            wallet.setBalance(wallet.getBalance().add(order.getPrice()));

            transactionService.createTransaction(wallet, order.getPrice(), WalletTransactionType.SELL_ASSET);
        }
        return walletRepository.save(wallet);
    }
}
