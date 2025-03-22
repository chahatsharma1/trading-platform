package com.chahat.trading_platform.request;

import com.chahat.trading_platform.domain.OrderType;
import lombok.Data;

@Data
public class CreateOrderRequest {
    private String coinId;
    private double quantity;
    private OrderType orderType;
}
