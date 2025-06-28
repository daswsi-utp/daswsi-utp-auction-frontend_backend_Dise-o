package com.microservice.service;

import com.microservice.entity.ChatResponse;
import com.microservice.model.ChatMessage;
import com.microservice.repository.ChatResponseRepository;
import com.microservice.strategy.ChatStrategyContext;
import com.microservice.strategy.ExactMultipleKeywordStrategy;
import com.microservice.strategy.FuzzyWuzzyStrategy;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatResponseRepository repository;
    private final ChatStrategyContext context;
    private final ExactMultipleKeywordStrategy exactStrategy;
    private final FuzzyWuzzyStrategy fuzzyWuzzyStrategy;

    public ChatMessage getResponse(String message) {
        System.out.println("💬 Usuario preguntó: \"" + message + "\"");

        List<ChatResponse> respuestas = repository.findAll();

        if (respuestas == null || respuestas.isEmpty()) {
            System.out.println(" No hay respuestas cargadas en la base de datos.");
            return new ChatMessage("Chatbot", "¡Aún no tengo respuestas configuradas! ", null, null);
        }


        context.setStrategy(exactStrategy);
        ChatResponse exacta = context.executeStrategy(message, respuestas);
        if (exacta != null) {
            System.out.println(" Estrategia utilizada: Exacta");
            System.out.println(" Coincidencia exacta: \"" + exacta.getResponse() + "\"");
            return toMessage(exacta);
        }

        context.setStrategy(fuzzyWuzzyStrategy);
        ChatResponse fuzzy = context.executeStrategy(message, respuestas);
        if (fuzzy != null && !fuzzy.getResponse().contains("No entendí")) {
            System.out.println(" Estrategia utilizada: FuzzyWuzzy");
            System.out.println(" Coincidencia difusa: \"" + fuzzy.getResponse() + "\"");
            return toMessage(fuzzy);
        }

        System.out.println(" Ninguna estrategia encontró coincidencias válidas.");
        return new ChatMessage("Chatbot", "No entendí tu pregunta :( ¿Puedes reformularla?", null, null);
    }

    private ChatMessage toMessage(ChatResponse r) {
        return new ChatMessage("Chatbot", r.getResponse(), r.getActionText(), r.getActionUrl());
    }
}
