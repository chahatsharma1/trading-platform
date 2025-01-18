package com.chahat.trading_platform.service;

import com.chahat.trading_platform.model.Coin;
import java.util.List;

public interface CoinService {
    List<Coin> getCoinList (int page) throws Exception;

    String getMarketCharts(String coinId, int days) throws Exception;

    String getCoinDetails(String coinId) throws Exception;

    Coin findById(String coinId) throws Exception;

    String searchCoin(String keyword) throws Exception;

    String getTop50CoinsByMarketCapRank() throws Exception;

    String getTradingCoins() throws Exception;
}
