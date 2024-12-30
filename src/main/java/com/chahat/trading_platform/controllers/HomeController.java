package com.chahat.trading_platform.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping
    public String home(){
        return "WELCOME TO THE TRADING PLATFORM";
    }

    @GetMapping("/new")
    public String newHome(){
        return "WELCOME";
    }
}
