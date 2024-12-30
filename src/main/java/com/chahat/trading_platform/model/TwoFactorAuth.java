package com.chahat.trading_platform.model;

import com.chahat.trading_platform.domain.VerificationType;
import lombok.Data;

@Data
public class TwoFactorAuth {
    private boolean isEnabled = false;
    private VerificationType sendTo;
}
