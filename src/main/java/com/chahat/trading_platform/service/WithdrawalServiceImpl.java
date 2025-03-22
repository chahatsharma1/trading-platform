package com.chahat.trading_platform.service;

import com.chahat.trading_platform.domain.WithdrawalStatus;
import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.model.Withdrawal;
import com.chahat.trading_platform.repository.WithdrawalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class WithdrawalServiceImpl implements WithdrawalService {

    @Autowired
    private WithdrawalRepository withdrawalRepository;

    @Override
    public Withdrawal requestWithdrawal(long amount, User user) {
        Withdrawal withdrawal = new Withdrawal();
        withdrawal.setAmount(amount);
        withdrawal.setUser(user);
        withdrawal.setStatus(WithdrawalStatus.PENDING);
        return withdrawalRepository.save(withdrawal);
    }

    @Override
    public Withdrawal proceedWithWithdrawal(long withdrawalId, boolean accept) throws Exception {
        Optional<Withdrawal> withdrawal = withdrawalRepository.findById(withdrawalId);
        if (withdrawal.isEmpty()){
            throw new Exception("Withdrawal Not Requested");
        }
        Withdrawal withdrawal1 = withdrawal.get();
        withdrawal1.setDate(LocalDateTime.now());
        if (accept){
            withdrawal1.setStatus(WithdrawalStatus.SUCCESS);
        } else {
            withdrawal1.setStatus(WithdrawalStatus.DECLINE);
        }
        return withdrawalRepository.save(withdrawal1);
    }

    @Override
    public List<Withdrawal> getUsersWithdrawalHistory(User user) {
        return withdrawalRepository.findByUserId(user.getId());
    }

    @Override
    public List<Withdrawal> getAllWithdrawal() {
        return withdrawalRepository.findAll();
    }
}
