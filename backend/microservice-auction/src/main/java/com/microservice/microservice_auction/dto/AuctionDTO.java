package com.microservice.microservice_auction.dto;

import lombok.*;
import java.time.LocalDateTime;
import com.microservice.microservice_auction.model.AuctionStatus;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class AuctionDTO {
    private Long id;
    private Long productId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Double initialPrice;
    private Double currentPrice;
    private Double finalPrice;
    private Long winnerId;
    private AuctionStatus status;
    private Boolean visible;
}
