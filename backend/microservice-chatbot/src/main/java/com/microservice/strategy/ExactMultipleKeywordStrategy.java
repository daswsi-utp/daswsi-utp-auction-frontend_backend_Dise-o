package com.microservice.strategy;

import com.microservice.entity.ChatResponse;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ExactMultipleKeywordStrategy implements ChatStrategy {

    @Override
    public ChatResponse generateResponse(String message, List<ChatResponse> respuestas) {
        String mensaje = message.toLowerCase().trim();
        System.out.println(" [ExactStrategy] Buscando coincidencias para: \"" + mensaje + "\"");

        for (ChatResponse r : respuestas) {
            String keywordsRaw = r.getKeywords();
            if (keywordsRaw == null || keywordsRaw.isBlank()) continue;

            String[] keywords = keywordsRaw.toLowerCase().split(",");

            for (String keyword : keywords) {
                String palabraClave = keyword.trim();
                if (mensaje.contains(palabraClave)) {
                    System.out.println(" [ExactStrategy] Coincidencia encontrada con keyword: \"" + palabraClave + "\"");
                    System.out.println(" [ExactStrategy] Respuesta seleccionada: \"" + r.getResponse() + "\"");
                    return r;
                }
            }
        }

        System.out.println(" [ExactStrategy] No se encontraron coincidencias exactas.");
        return null;
    }
}
