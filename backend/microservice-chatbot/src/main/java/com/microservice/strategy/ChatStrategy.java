package com.microservice.strategy;

import com.microservice.entity.ChatResponse;
import java.util.List;

public interface ChatStrategy {
    ChatResponse generateResponse(String userMessage, List<ChatResponse> respuestas);
}
