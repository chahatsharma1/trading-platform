package com.chahat.trading_platform.service;

import com.chahat.trading_platform.domain.OrderType;
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

    @Override
    public Wallet getUserWallet(User user) {
        Wallet wallet = walletRepository.findWalletByUserId(user.getId());
        if (wallet == null){
            wallet = new Wallet();
            wallet.setUser(user);
        }
        return wallet;
    }

    @Override
    public Wallet addBalance(Wallet wallet, Long amount) {
        BigDecimal balance = wallet.getBalance();
        BigDecimal newBalance = balance.add(BigDecimal.valueOf(amount));
        wallet.setBalance(newBalance);

        return walletRepository.save(wallet);
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
    public Wallet walletToWalletTransaction(User sender, Wallet receiver, Long amount) throws Exception {
        Wallet senderWallet = getUserWallet(sender);

        if (senderWallet.getBalance().compareTo(BigDecimal.valueOf(amount)) < 0){
            throw new Exception("Insufficient Balance");
        }

        senderWallet.setBalance(senderWallet.getBalance().subtract(BigDecimal.valueOf(amount)));
        walletRepository.save(senderWallet);

        receiver.setBalance(receiver.getBalance().add(BigDecimal.valueOf(amount)));
        walletRepository.save(receiver);
        return senderWallet;
    }

    @Override
    public Wallet payOrderPayment(Order order, User user) throws Exception {
        Wallet wallet = getUserWallet(user);
        if (order.getOrderType().equals(OrderType.BUY)) {
            BigDecimal newBalance = wallet.getBalance().subtract(order.getPrice());
            if (newBalance.compareTo(order.getPrice()) < 0) {
                throw new Exception("Insufficient Fund");
            }
            wallet.setBalance(newBalance);
        } else {
            wallet.setBalance(wallet.getBalance().add(order.getPrice()));
        }
        return walletRepository.save(wallet);
    }
}
