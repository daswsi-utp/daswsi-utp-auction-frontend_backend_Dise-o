package com.microservice.strategy;

import com.microservice.entity.ChatResponse;
import me.xdrop.fuzzywuzzy.FuzzySearch;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FuzzyWuzzyStrategy implements ChatStrategy {

    private static final int SIMILARITY_THRESHOLD = 70;

    @Override
    public ChatResponse generateResponse(String userMessage, List<ChatResponse> respuestas) {
        String message = userMessage.toLowerCase().trim();
        System.out.println(" [FuzzyStrategy] Analizando mensaje: \"" + message + "\"");

        ChatResponse bestMatch = null;
        String bestKeyword = "";
        int bestScore = 0;

        for (ChatResponse r : respuestas) {
            String[] keywords = r.getKeywords().toLowerCase().split(",");

            for (String keyword : keywords) {
                String keywordTrimmed = keyword.trim();
                int score = FuzzySearch.tokenSortRatio(message, keywordTrimmed);

                System.out.println("    Comparando con keyword: \"" + keywordTrimmed + "\" → Similitud: " + score);

                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = r;
                    bestKeyword = keywordTrimmed;
                }
            }
        }

        if (bestMatch != null && bestScore >= SIMILARITY_THRESHOLD) {
            System.out.println(" [FuzzyStrategy] Mejor coincidencia: \"" + bestKeyword + "\" con puntaje: " + bestScore);
            System.out.println(" [FuzzyStrategy] Respuesta seleccionada: \"" + bestMatch.getResponse() + "\"");
            return bestMatch;
        }

        System.out.println(" [FuzzyStrategy] Ninguna coincidencia superó el umbral de " + SIMILARITY_THRESHOLD);
        return ChatResponse.builder()
                .response("No entendí tu pregunta :( . ¿Puedes reformularla?")
                .actionText(null)
                .actionUrl(null)
                .build();
    }
}
