package com.chahat.trading_platform.controllers;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;

@RestController
@RequestMapping("/chatbot")
public class ChatbotController {

    @Value("${GEMINI_API_KEY}")
    private String apiKey;

    @PostMapping
    public ResponseEntity<String> getResponse(@RequestBody Map<String, String> payload) {
        String prompt = payload.get("prompt");

        String response = callGeminiAPI(prompt);
        return ResponseEntity.ok(response);
    }

    private String callGeminiAPI(String prompt) {
        try {
            HttpClient client = HttpClient.newHttpClient();

            String endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;

            String body = """
                {
                  "contents": [{
                    "parts": [{"text": "%s"}]
                  }]
                }
            """.formatted(prompt);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(endpoint))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            JSONObject obj = new JSONObject(response.body());

            if (!obj.has("candidates")) {
                return "Gemini API Error: " + obj.optJSONObject("error").optString("message", "Unknown error");
            }

            return obj
                    .getJSONArray("candidates")
                    .getJSONObject(0)
                    .getJSONObject("content")
                    .getJSONArray("parts")
                    .getJSONObject(0)
                    .getString("text");

        } catch (Exception e) {
            e.printStackTrace();
            return "Sorry, something went wrong.";
        }
    }
}