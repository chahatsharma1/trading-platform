package com.chahat.trading_platform.response;

import lombok.Data;

@Data
public class AuthResponse {
    private String jwt;
    private boolean status;
    private String message;
    private boolean isTwoFactorAuthEnable;
    private Long session;
}
