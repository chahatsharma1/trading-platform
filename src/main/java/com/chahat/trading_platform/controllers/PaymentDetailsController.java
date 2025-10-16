package com.chahat.trading_platform.controllers;

import com.chahat.trading_platform.model.PaymentDetails;
import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.service.PaymentDetailsService;
import com.chahat.trading_platform.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@PreAuthorize("hasRole('CUSTOMER')")
public class PaymentDetailsController {

    @Autowired
    private UserService userService;

    @Autowired
    private PaymentDetailsService paymentDetailsService;

    @PostMapping("/addPayment")
    public ResponseEntity<PaymentDetails> addPaymentDetails(@RequestBody PaymentDetails paymentDetails, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJWT(jwt);
        PaymentDetails paymentDetails1 = paymentDetailsService.addPaymentDetails(paymentDetails.getAccountNo(), paymentDetails.getAccountHolderName(), paymentDetails.getIfscCode(), paymentDetails.getBankName(), user);
        return new ResponseEntity<>(paymentDetails1, HttpStatus.CREATED);
    }

    @GetMapping("/payment-details")
    public ResponseEntity<PaymentDetails> getUsersPaymentDetails(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJWT(jwt);
        PaymentDetails paymentDetails = paymentDetailsService.getUserPaymentDetails(user);
        return new ResponseEntity<>(paymentDetails, HttpStatus.CREATED);
    }
    @DeleteMapping("/deleteDetails")
    public String deletePaymentDetails(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJWT(jwt);
        return paymentDetailsService.deletePaymentDetails(user);
    }
}
