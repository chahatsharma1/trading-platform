package com.chahat.trading_platform.service;

import com.chahat.trading_platform.model.Coin;
import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.model.WatchList;

public interface WatchListService {
    WatchList findUserWatchList(Long userId) throws Exception;
    WatchList createList(User user);
    WatchList findById(Long id) throws Exception;
    Coin addItemToWatchList(Coin coin, User user) throws Exception;
}
