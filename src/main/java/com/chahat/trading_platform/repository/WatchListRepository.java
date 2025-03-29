package com.chahat.trading_platform.repository;

import com.chahat.trading_platform.model.WatchList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WatchListRepository extends JpaRepository<WatchList, Long> {
    WatchList findByUserId(Long userId);
}
