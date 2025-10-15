package com.chahat.trading_platform.service;

import org.springframework.http.ResponseEntity;
import java.util.Map;

public interface ChatbotService {
    ResponseEntity<String> getResponse(Map<String, String> payload);
    String extractCoinName(String prompt);
    String callGeminiAPI(String prompt);
}