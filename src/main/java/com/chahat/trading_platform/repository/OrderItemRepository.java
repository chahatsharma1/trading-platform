package com.chahat.trading_platform.repository;

import com.chahat.trading_platform.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
