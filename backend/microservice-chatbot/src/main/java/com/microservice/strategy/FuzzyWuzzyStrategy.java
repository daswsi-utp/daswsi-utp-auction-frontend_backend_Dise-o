package com.microservice.strategy;

import com.microservice.entity.ChatResponse;
import com.microservice.strategy.sanitizer.TextSanitizerStrategy;
import lombok.RequiredArgsConstructor;
import me.xdrop.fuzzywuzzy.FuzzySearch;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class FuzzyWuzzyStrategy implements ChatStrategy {

    private static final int SIMILARITY_THRESHOLD = 70;
    private final TextSanitizerStrategy sanitizer;

    @Override
    public ChatResponse generateResponse(String userMessage, List<ChatResponse> respuestas) {
        String cleanedMessage = sanitizer.sanitize(userMessage);
        ChatResponse bestMatch = null;
        int bestScore = 0;

        for (ChatResponse r : respuestas) {
            for (String keyword : r.getKeywords().toLowerCase().split(",")) {
                int score = FuzzySearch.tokenSortRatio(cleanedMessage, keyword.trim());
                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = r;
                }
            }
        }

        if (bestMatch != null && bestScore >= SIMILARITY_THRESHOLD) {
            return bestMatch;
        }

        return ChatResponse.builder()
                .response("No entendí tu pregunta :(. ¿Puedes reformularla?")
                .actionText(null)
                .actionUrl(null)
                .build();
    }
}
