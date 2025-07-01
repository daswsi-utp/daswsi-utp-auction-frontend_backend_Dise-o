package com.microservice.dto;

import lombok.*;
import java.time.LocalDateTime;

import com.microservice.model.TransactionStatus;


@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class TransactionDTO {
    private Long id;
    private Long auctionId;
    private Long buyerId;
    private Double finalAmount;
    private LocalDateTime transactionDate;
    private TransactionStatus status;
    private Boolean visible;
}