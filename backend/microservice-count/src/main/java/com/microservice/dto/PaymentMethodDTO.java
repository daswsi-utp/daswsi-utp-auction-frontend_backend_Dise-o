package com.microservice.dto;

import com.microservice.model.PaymentMethodType;

import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class PaymentMethodDTO {
    private Long id;
    private Long userId;
    private PaymentMethodType type;
    private String details;
    private Boolean defaultMethod;
    private Boolean visible;
}