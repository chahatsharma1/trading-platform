package com.chahat.trading_platform.request;

import com.chahat.trading_platform.domain.VerificationType;
import lombok.Data;

@Data
public class ForgotPasswordRequest {
    private String sendTo;
    private VerificationType verificationType;
}
