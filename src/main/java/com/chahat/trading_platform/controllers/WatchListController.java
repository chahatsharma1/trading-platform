package com.chahat.trading_platform.controllers;

import com.chahat.trading_platform.model.Coin;
import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.model.WatchList;
import com.chahat.trading_platform.service.CoinService;
import com.chahat.trading_platform.service.UserService;
import com.chahat.trading_platform.service.WatchListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/watchlist")
public class WatchListController {

    @Autowired
    private WatchListService watchListService;

    @Autowired
    private UserService userService;

    @Autowired
    private CoinService coinService;

    @GetMapping("/user")
    public ResponseEntity<WatchList> getUserWatchList(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJWT(jwt);
        WatchList watchList = watchListService.findUserWatchList(user.getId());
        return ResponseEntity.ok(watchList);
    }

    @GetMapping("/{watchListId}")
    public ResponseEntity<WatchList> getUserWatchList(@PathVariable Long watchListId) throws Exception {
        WatchList watchList = watchListService.findById(watchListId);
        return ResponseEntity.ok(watchList);
    }

    @PatchMapping("/coin/{coinId}")
    public ResponseEntity<Coin> addItemToWatchList(@RequestHeader("Authorization") String jwt, @PathVariable String coinId) throws Exception {
        User user = userService.findUserByJWT(jwt);
        Coin coin = coinService.findById(coinId);
        Coin addedCoin = watchListService.addItemToWatchList(coin, user);
        return ResponseEntity.ok(addedCoin);
    }
}
