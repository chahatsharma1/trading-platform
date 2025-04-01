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
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private UserService userService;

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/{paymentMethod}/amount/{amount}")
    public ResponseEntity<PaymentResponse> paymentHandler(@PathVariable PaymentMethod paymentMethod, @PathVariable Long amount, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJWT(jwt);

        PaymentResponse paymentResponse;

        if (paymentMethod.equals(PaymentMethod.RAZORPAY)){
            PaymentOrder order = paymentService.createOrder(user, amount , paymentMethod);
            paymentResponse = paymentService.createRazorPayPaymentLink(user, amount, order.getId());
        } else {
            PaymentOrder order = paymentService.createOrder(user, amount * 82 , paymentMethod);
            paymentResponse = paymentService.createStripePaymentLink(user, amount, order.getId());
        }
        return new ResponseEntity<>(paymentResponse, HttpStatus.CREATED);
    }
}
