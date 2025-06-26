package com.microservice.repository;

import com.microservice.entity.ChatResponse;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ChatResponseRepository extends JpaRepository<ChatResponse, Long> {
    Optional<ChatResponse> findByKeywordIgnoreCase(String keyword);
}
