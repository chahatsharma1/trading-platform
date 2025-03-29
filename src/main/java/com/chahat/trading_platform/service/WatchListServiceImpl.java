package com.chahat.trading_platform.service;

import com.chahat.trading_platform.model.Coin;
import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.model.WatchList;
import com.chahat.trading_platform.repository.WatchListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WatchListServiceImpl implements WatchListService{

    @Autowired
    private WatchListRepository watchListRepository;

    @Override
    public WatchList findUserWatchList(Long userId) throws Exception {
        WatchList watchList = watchListRepository.findByUserId(userId);
        if (watchList == null){
            throw new Exception("Watchlist Not Found");
        }
        return watchList;
    }

    @Override
    public WatchList createList(User user) {
        WatchList watchList = new WatchList();
        watchList.setUser(user);
        return watchListRepository.save(watchList);
    }

    @Override
    public WatchList findById(Long id) throws Exception {
        Optional<WatchList> watchListOptional = watchListRepository.findById(id);
        if (watchListOptional.isEmpty()){
            throw new Exception("Watchlist Not Found");
        }
        return watchListOptional.get();
    }

    @Override
    public Coin addItemToWatchList(Coin coin, User user) throws Exception {
        WatchList watchList = findUserWatchList(user.getId());
        if (watchList.getCoins().contains(coin)){
            watchList.getCoins().remove(coin);
        } else {
            watchList.getCoins().add(coin);
        }
        return coin;
    }
}
