package com.microservice.microservice_auction.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class AuctionHistoryDTO {
    private Long id;
    private Long userId;
    private Long auctionId;
    private String interactionType;
    private Double amount;
    private LocalDateTime date;
    private Boolean visible;
}
