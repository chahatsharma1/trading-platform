package com.chahat.trading_platform.service;

import com.chahat.trading_platform.model.PaymentDetails;
import com.chahat.trading_platform.model.User;

public interface PaymentDetailsService {
    public PaymentDetails addPaymentDetails(String accountNumber, String accountHolderName, String ifsc, String bankName, User user);
    public PaymentDetails getUserPaymentDetails(User user);
    public String deletePaymentDetails(User user);
}
