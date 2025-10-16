package com.chahat.trading_platform.controllers;

import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.model.Wallet;
import com.chahat.trading_platform.model.WalletTransaction;
import com.chahat.trading_platform.service.TransactionService;
import com.chahat.trading_platform.service.UserService;
import com.chahat.trading_platform.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/transaction")
@PreAuthorize("hasRole('CUSTOMER')")
public class TransactionController {

    @Autowired
    private WalletService walletService;

    @Autowired
    private UserService userService;

    @Autowired
    private TransactionService transactionService;

    @GetMapping
    public ResponseEntity<List<WalletTransaction>> getUserWalletTransaction(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJWT(jwt);
        Wallet wallet = walletService.getUserWallet(user);
        List<WalletTransaction> walletTransactionList = transactionService.getTransactionsByWallet(wallet);
        return new ResponseEntity<>(walletTransactionList, HttpStatus.OK);
    }
}
