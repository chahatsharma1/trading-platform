package com.chahat.trading_platform.service;

import com.chahat.trading_platform.model.Asset;
import com.chahat.trading_platform.model.Coin;
import com.chahat.trading_platform.model.User;

import java.util.List;

public interface AssetService {

    void createAsset(User user, Coin coin, double quantity);
    Asset getAssetById(Long assetId);
    List<Asset> getUsersAssets(Long userId);
    Asset updateAsset(Long assetId, double quantity);
    Asset findAssetByUserIdAndCoinId(Long userId, String coinId);
    void deleteAsset(Long assetId);
}
