package com.chahat.trading_platform.controllers;

import com.chahat.trading_platform.domain.PaymentMethod;
import com.chahat.trading_platform.model.PaymentOrder;
import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.response.PaymentResponse;
import com.chahat.trading_platform.service.PaymentService;
import com.chahat.trading_platform.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
@PreAuthorize("hasRole('CUSTOMER')")
public class PaymentController {

    @Autowired
    private UserService userService;

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/{paymentMethod}/amount/{amount}")
    public ResponseEntity<PaymentResponse> paymentHandler(@PathVariable PaymentMethod paymentMethod, @PathVariable Long amount, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJWT(jwt);
        String currency = paymentMethod.equals(PaymentMethod.DOMESTIC) ? "INR" : "USD";
        Long finalAmount = paymentMethod.equals(PaymentMethod.DOMESTIC) ? amount : amount * 85;

        PaymentOrder order = paymentService.createOrder(user, finalAmount , paymentMethod);
        PaymentResponse paymentResponse = paymentService.createStripePaymentLink(user, amount, order.getId(), currency);
        return new ResponseEntity<>(paymentResponse, HttpStatus.CREATED);
    }
}
