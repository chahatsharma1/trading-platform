package com.chahat.trading_platform.controllers;

import com.chahat.trading_platform.service.ChatbotService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/chatbot")
public class ChatbotController {

    private final ChatbotService chatbotService;

    public ChatbotController(ChatbotService chatbotService){
        this.chatbotService = chatbotService;
    }

    @PostMapping
    public ResponseEntity<String> getResponse(@RequestBody Map<String, String> payload) {
        return chatbotService.getResponse(payload);
    }
}