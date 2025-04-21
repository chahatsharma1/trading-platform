package com.chahat.trading_platform.service;

import com.chahat.trading_platform.model.PaymentDetails;
import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.repository.PaymentDetailsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentDetailsServiceImpl implements PaymentDetailsService{

    @Autowired
    private PaymentDetailsRepository paymentDetailsRepository;

    @Override
    public PaymentDetails addPaymentDetails(String accountNumber, String accountHolderName, String ifsc, String bankName, User user) {
        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setAccountNo(accountNumber);
        paymentDetails.setAccountHolderName(accountHolderName);
        paymentDetails.setIfscCode(ifsc);
        paymentDetails.setBankName(bankName);
        paymentDetails.setUser(user);
        return paymentDetailsRepository.save(paymentDetails);
    }

    @Override
    public PaymentDetails getUserPaymentDetails(User user) {
        return paymentDetailsRepository.findByUserId(user.getId());
    }

    @Override
    @Transactional
    public String deletePaymentDetails(User user) {
        PaymentDetails pd = paymentDetailsRepository.findByUserId(user.getId());
        paymentDetailsRepository.delete(pd);
        return "Deleted Successfully";
    }
}
