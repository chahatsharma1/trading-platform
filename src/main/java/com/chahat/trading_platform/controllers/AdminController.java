package com.chahat.trading_platform.controllers;

import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.model.Wallet;
import com.chahat.trading_platform.model.Withdrawal;
import com.chahat.trading_platform.service.UserService;
import com.chahat.trading_platform.service.WalletService;
import com.chahat.trading_platform.service.WithdrawalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private WithdrawalService withdrawalService;

    @Autowired
    private WalletService walletService;

    @Autowired
    private UserService userService;

    @PatchMapping("/proceed/{id}/{accept}")
    public ResponseEntity<?> proceedWithdrawal(@PathVariable Long id, @PathVariable boolean accept, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJWT(jwt);
        Withdrawal withdrawal = withdrawalService.proceedWithWithdrawal(id, accept);
        Wallet wallet = walletService.getUserWallet(user);

        if (!accept){
            walletService.addBalance(wallet, withdrawal.getAmount());
        }
        return new ResponseEntity<>(withdrawal, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Withdrawal>> getWithdrawalRequest(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJWT(jwt);
        List<Withdrawal> withdrawals = withdrawalService.getAllWithdrawal();
        return new ResponseEntity<>(withdrawals, HttpStatus.OK);
    }
}
