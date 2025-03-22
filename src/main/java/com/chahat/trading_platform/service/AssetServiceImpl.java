package com.chahat.trading_platform.service;

import com.chahat.trading_platform.model.Asset;
import com.chahat.trading_platform.model.Coin;
import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.repository.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssetServiceImpl implements AssetService{

    @Autowired
    private AssetRepository assetRepository;

    @Override
    public Asset createAsset(User user, Coin coin, double quantity) {
        Asset asset = new Asset();
        asset.setUser(user);
        asset.setCoin(coin);
        asset.setQuantity(quantity);
        asset.setBuyPrice(coin.getCurrentPrice());
        return assetRepository.save(asset);
    }

    @Override
    public Asset getAssetById(Long assetId) {
        return assetRepository.findById(assetId).orElseThrow(() -> new RuntimeException("Asset Not Found"));
    }

    @Override
    public Asset getAssetByUserIdAndAssetId(Long userID, Long assetId) {
        return null;
    }

    @Override
    public List<Asset> getUsersAssets(Long userId) {
        return List.of();
    }

    @Override
    public Asset updateAsset(Asset asset, double quantity) {
        return null;
    }

    @Override
    public Asset findAssetByUserIdAndCoinId(Long userId, String coinId) {
        return null;
    }

    @Override
    public void deleteAsset(Long assetId) {

    }
}
