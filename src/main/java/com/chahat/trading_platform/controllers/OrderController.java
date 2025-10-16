package com.chahat.trading_platform.controllers;

import com.chahat.trading_platform.domain.OrderType;
import com.chahat.trading_platform.model.Coin;
import com.chahat.trading_platform.model.Order;
import com.chahat.trading_platform.model.User;
import com.chahat.trading_platform.request.CreateOrderRequest;
import com.chahat.trading_platform.service.CoinService;
import com.chahat.trading_platform.service.OrderService;
import com.chahat.trading_platform.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/order")
@PreAuthorize("hasRole('CUSTOMER')")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private CoinService coinService;

    @PostMapping("/pay")
    public ResponseEntity<Order> payOrderPayment(@RequestHeader("Authorization") String jwt, @RequestBody CreateOrderRequest request) throws Exception {
        User user = userService.findUserByJWT(jwt);
        Coin coin = coinService.findById(request.getCoinId());

        Order order = orderService.processOrder(coin, request.getQuantity(), request.getOrderType(), user);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@RequestHeader("Authorization") String jwt, @PathVariable Long orderId) throws Exception {
        if (jwt == null){
            throw new Exception("Token Missing");
        }

        User user = userService.findUserByJWT(jwt);
        Order order = orderService.getOrderById(orderId);

        if (order.getUser().getId() == user.getId()){
            return ResponseEntity.ok(order);
        } else {
            throw new Exception("Cannot Access");
        }
    }

    @GetMapping()
    public ResponseEntity<List<Order>> getAllOrderByUser(@RequestHeader("Authorization") String jwt, @RequestParam(required = false) OrderType orderType, @RequestParam(required = false) String assetSymbol) throws Exception {

        Long userID = userService.findUserByJWT(jwt).getId();
        List<Order> orders = orderService.getAllOrderOfUser(userID, orderType, assetSymbol);

        return ResponseEntity.ok(orders);
    }
}