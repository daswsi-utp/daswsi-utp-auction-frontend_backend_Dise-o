package com.microservice.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.microservice.model.ChatMessage;
import com.microservice.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
@RequiredArgsConstructor
public class ChatWebSocketHandler extends TextWebSocketHandler {

    private final ChatService chatService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        ChatMessage incoming = objectMapper.readValue(message.getPayload(), ChatMessage.class);

        String responseText = chatService.getResponse(incoming.getContent());

        ChatMessage response = new ChatMessage("Chatbot", responseText);
        session.sendMessage(new TextMessage(objectMapper.writeValueAsString(response)));
    }
}
