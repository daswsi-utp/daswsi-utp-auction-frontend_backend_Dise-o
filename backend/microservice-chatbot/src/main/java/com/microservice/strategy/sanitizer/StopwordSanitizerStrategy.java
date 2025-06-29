package com.microservice.strategy.sanitizer;

import com.microservice.entity.Stopword;
import com.microservice.repository.StopwordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class StopwordSanitizerStrategy implements TextSanitizerStrategy {

    private final StopwordRepository stopwordRepository;

    @Override
    public String sanitize(String input) {
        if (input == null || input.trim().isEmpty()) return "";

        String message = input.toLowerCase();
        List<Stopword> stopwords = stopwordRepository.findAll();

        for (Stopword s : stopwords) {
            message = message.replaceAll("\\b" + s.getWord() + "\\b", "").replaceAll("\\s{2,}", " ").trim();
        }
        return message;
    }
}
