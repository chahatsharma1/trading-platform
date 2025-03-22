package com.chahat.trading_platform.service;

import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.model.Withdrawal;
import java.util.List;

public interface WithdrawalService {
    Withdrawal requestWithdrawal(long amount, User user);
    Withdrawal proceedWithWithdrawal(long withdrawalId, boolean accept) throws Exception;
    List<Withdrawal> getUsersWithdrawalHistory(User user);
    List<Withdrawal> getAllWithdrawal();
}