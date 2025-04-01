package com.chahat.trading_platform.controllers;

import com.chahat.trading_platform.model.*;
import com.chahat.trading_platform.response.PaymentResponse;
import com.chahat.trading_platform.service.OrderService;
import com.chahat.trading_platform.service.PaymentService;
import com.chahat.trading_platform.service.UserService;
import com.chahat.trading_platform.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/wallet")
public class WalletController {

    @Autowired
    private WalletService walletService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentService paymentService;

    @GetMapping
    public ResponseEntity<Wallet> getUserWallet(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJWT(jwt);
        Wallet wallet = walletService.getUserWallet(user);
        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
    }

    @PutMapping("/{walletId}/transfer")
    public ResponseEntity<Wallet> walletToWalletTransaction(@RequestHeader("Authorization") String jwt, @PathVariable Long walletId, @RequestBody WalletTransaction walletTransaction) throws Exception {
        User senderUser = userService.findUserByJWT(jwt);
        Wallet receiverWallet = walletService.findByID(walletId);
        Wallet wallet = walletService.walletToWalletTransaction(senderUser, receiverWallet, walletTransaction.getAmount());
        return new ResponseEntity<>(wallet,HttpStatus.ACCEPTED);
    }

    @PutMapping("/order/{orderId}/pay")
    public ResponseEntity<Wallet> payOrderPayment(@RequestHeader("Authorization") String jwt, @PathVariable Long orderId) throws Exception {
        User user = userService.findUserByJWT(jwt);
        Order order = orderService.getOrderById(orderId);
        Wallet wallet = walletService.payOrderPayment(order, user);
        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
    }

    @Transactional
    @PutMapping("/deposit")
    public ResponseEntity<Wallet> addBalanceToWallet(@RequestHeader("Authorization") String jwt, @RequestParam(name = "order_id") Long orderId, @RequestParam(name="payment_id") String paymentId) throws Exception {
        User user = userService.findUserByJWT(jwt);
        Wallet wallet = walletService.getUserWallet(user);
        PaymentOrder paymentOrder = paymentService.getPaymentOrderById(orderId);
        Boolean status = paymentService.ProceedPaymentOrder(paymentOrder, paymentId);

        if (wallet.getBalance() == null){
            wallet.setBalance(BigDecimal.valueOf(0));
        }
        if (status){
            wallet = walletService.addBalance(wallet, paymentOrder.getAmount());
        }

        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
    }
}
