package com.chahat.trading_platform.request;

import lombok.Data;

@Data
public class VerifyOTPRequest {
    private String newPassword;
    private String otp;
}
