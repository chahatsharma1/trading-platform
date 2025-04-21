package com.chahat.trading_platform.controllers;

import com.chahat.trading_platform.service.CoinService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private CoinService coinService;

    @Value("${GEMINI_API_KEY}")
    private String apiKey;

    private final HttpClient client = HttpClient.newHttpClient();

    @PostMapping
    public ResponseEntity<String> getResponse(@RequestBody Map<String, String> payload) {
        String prompt = payload.get("prompt").toLowerCase();

        if (prompt.contains("price") || prompt.contains("market cap") || prompt.contains("volume")) {
            String coinName = extractCoinName(prompt);
            if (coinName != null) {
                try {
                    String coinDataJson = coinService.getCoinDetails(coinName);

                    ObjectMapper objectMapper = new ObjectMapper();
                    JsonNode coinData = objectMapper.readTree(coinDataJson);

                    String name = coinData.get("name").asText();
                    String symbol = coinData.get("symbol").asText().toUpperCase();

                    JsonNode marketData = coinData.get("market_data");

                    double price = marketData != null ? marketData.get("current_price").get("inr").asDouble() : 0.0;
                    double marketCap = marketData != null ? marketData.get("market_cap").get("inr").asDouble() : 0.0;
                    double volume = marketData != null ? marketData.get("total_volume").get("inr").asDouble() : 0.0;

                    String response = String.format(
                            """
                                    🪙 %s (%s) is currently priced at ₹ %,.2f.
                                    📊 Market Cap: ₹ %,.2f
                                    🔁 24h Volume: ₹ %,.2f""",
                            name, symbol, price, marketCap, volume
                    );

                    return ResponseEntity.ok(response);

                } catch (Exception e) {
                    return ResponseEntity.ok("⚠️ Failed to get coin data: " + e.getMessage());
                }
            } else {
                return ResponseEntity.ok("❗ Please specify a valid coin name like Bitcoin, Ethereum, etc.");
            }
        } else {
            String response = callGeminiAPI(prompt);
            return ResponseEntity.ok(response);
        }
    }


    private String extractCoinName(String prompt) {
        String[] knownCoins = {"bitcoin", "ethereum", "dogecoin", "cardano", "solana", "bnb"};
        for (String coin : knownCoins) {
            if (prompt.contains(coin)) return coin;
        }
        return null;
    }

    private String callGeminiAPI(String prompt) {
        try {
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
            String responseBody = response.body();


            JSONObject obj = new JSONObject(responseBody);
            if (obj.has("candidates")) {
                return obj
                        .getJSONArray("candidates")
                        .getJSONObject(0)
                        .getJSONObject("content")
                        .getJSONArray("parts")
                        .getJSONObject(0)
                        .getString("text");
            } else {
                return "⚠️ Sorry, no content found in Gemini response.";
            }

        } catch (Exception e) {
            return "⚠️ Sorry, something went wrong with Gemini: " + e.getMessage();
        }
    }
}