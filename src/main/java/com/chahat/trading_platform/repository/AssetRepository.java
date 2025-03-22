package com.chahat.trading_platform.repository;

import com.chahat.trading_platform.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssetRepository extends JpaRepository<Asset, Long> {
    List<Asset> findByUserId(Long userId);
    Asset findByUserIdAndCoinId(Long userId, String coinId);
    Asset findByUserIdAndId(Long userId, Long assetId);
}