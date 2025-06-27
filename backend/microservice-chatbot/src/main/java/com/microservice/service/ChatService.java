package com.microservice.service;

import com.microservice.entity.ChatResponse;
import com.microservice.model.ChatMessage;
import com.microservice.repository.ChatResponseRepository;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final ChatResponseRepository repository;

    public ChatService(ChatResponseRepository repository) {
        this.repository = repository;
    }

    public ChatMessage getResponse(String keyword) {
        return repository.findByKeywordIgnoreCase(keyword)
                .map(r -> new ChatMessage("Chatbot", r.getResponse(), r.getActionText(), r.getActionUrl()))
                .orElse(new ChatMessage("Chatbot", "No entendí tu pregunta :( . ¿Puedes reformularla?", null, null));
    }
}
