package com.microservice.repository;

import com.microservice.entity.ChatResponse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatResponseRepository extends JpaRepository<ChatResponse, Long> {
    
}
