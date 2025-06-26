package com.microservice.strategy;

import com.microservice.entity.ChatResponse;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ChatStrategyContext {

    private ChatStrategy strategy;

    public void setStrategy(ChatStrategy strategy) {
        this.strategy = strategy;
    }

    public String executeStrategy(String message, List<ChatResponse> respuestas) {
        return strategy.generateResponse(message, respuestas);
    }
}
