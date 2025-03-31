package com.chahat.trading_platform.service;

import com.chahat.trading_platform.model.Coin;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;

public interface CoinService {
    List<Coin> getCoinList (int page) throws Exception;

    String getMarketCharts(String coinId, int days) throws Exception;

    String getCoinDetails(String coinId) throws Exception;

    Coin findById(String coinId) throws Exception;

    String searchCoin(String keyword) throws JsonProcessingException;

    String getTop50CoinsByMarketCapRank() throws JsonProcessingException;

    String getTrendingCoins() throws JsonProcessingException;
}
