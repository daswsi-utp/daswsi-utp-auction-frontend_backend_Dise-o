package com.microservice.controller;

import com.microservice.model.ChatMessage;
import com.microservice.service.ChatService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ChatMessage chat(@RequestBody ChatMessage message) {
        return chatService.getResponse(message.getContent());
    }
}
