package com.microservice.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class BidDTO {
    private Long id;
    private Long auctionId;
    private Long userId;
    private Double amount;
    private LocalDateTime bidDate;
    private Boolean visible;
}