package com.microservice.service;

import com.microservice.entity.ChatResponse;
import com.microservice.repository.ChatResponseRepository;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    private final ChatResponseRepository repository;

    public ChatService(ChatResponseRepository repository) {
        this.repository = repository;
    }

    public String getResponse(String keyword) {
        return repository.findByKeywordIgnoreCase(keyword)
                .map(ChatResponse::getResponse)
                .orElse("No entendí tu pregunta :( . ¿Puedes reformularla?");
    }
}
