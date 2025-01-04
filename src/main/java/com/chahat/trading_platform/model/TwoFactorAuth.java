package com.chahat.trading_platform.model;

import com.chahat.trading_platform.domain.VerificationType;

public class TwoFactorAuth {
    private boolean isEnabled = false;
    private VerificationType sendTo;

    public boolean isEnabled() {
        return isEnabled;
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
    }
}
