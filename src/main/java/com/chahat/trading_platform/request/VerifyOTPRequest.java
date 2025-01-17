package com.chahat.trading_platform.request;

import lombok.Data;

@Data
public class VerifyOTPRequest {
    private String sessionId;
    private String otp;
}
