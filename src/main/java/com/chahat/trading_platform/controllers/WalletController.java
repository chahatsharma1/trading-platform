package com.chahat.trading_platform.controllers;

import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.model.Wallet;
import com.chahat.trading_platform.model.WalletTransaction;
import com.chahat.trading_platform.service.UserService;
import com.chahat.trading_platform.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class WalletController {

    @Autowired
    private WalletService walletService;

    @Autowired
    private UserService userService;

    @GetMapping("/wallet")
    public ResponseEntity<Wallet> getUserWallet(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJWT(jwt);

        Wallet wallet = walletService.getUserWallet(user);

        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
    }

    @PutMapping("/wallet/{walletId}/transfer")
    public ResponseEntity<Wallet> walletToWalletTransaction(@RequestHeader("Authorization") String jwt, @PathVariable Long walletId, @RequestBody WalletTransaction walletTransaction) throws Exception {
        User senderUser = userService.findUserByJWT(jwt);
        Wallet receiverWallet = walletService.findByID(walletId);
        Wallet wallet = walletService.walletToWalletTransaction(senderUser, receiverWallet, walletTransaction.getAmount());
        return new ResponseEntity<>(wallet,HttpStatus.ACCEPTED);
    }
}
