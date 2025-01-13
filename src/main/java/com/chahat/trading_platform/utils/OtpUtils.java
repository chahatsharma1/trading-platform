package com.chahat.trading_platform.utils;

import lombok.Data;
import java.util.Random;

@Data
public class OtpUtils {
    public static String generateOtp(){
        int otpLength = 6;
        Random random = new Random();

        StringBuilder otp = new StringBuilder();
        for (int i = 0; i < otpLength; i++) {
            otp.append(random.nextInt(10));
        }
        return otp.toString();
    }
}
