package com.microservice.strategy;

import com.microservice.entity.ChatResponse;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ExactMatchStrategy implements ChatStrategy {

    @Override
    public String generateResponse(String userMessage, List<ChatResponse> respuestas) {
        String msg = userMessage.toLowerCase().trim();

        for (ChatResponse r : respuestas) {
            if (msg.contains(r.getKeyword().toLowerCase())) {
                return r.getResponse();
            }
        }

        return "No entendí tu pregunta 😕. ¿Puedes reformularla?";
    }
}
