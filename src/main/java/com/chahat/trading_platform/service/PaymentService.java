package com.chahat.trading_platform.service;

import com.chahat.trading_platform.domain.PaymentMethod;
import com.chahat.trading_platform.model.PaymentOrder;
import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.response.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {

    PaymentOrder createOrder(User user, Long amount, PaymentMethod paymentMethod);
    PaymentOrder getPaymentOrderById(Long id) throws Exception;
    Boolean ProceedPaymentOrder(PaymentOrder paymentOrder);
    PaymentResponse createStripePaymentLink(User user, Long amount, Long orderId, String currency) throws StripeException;
}
