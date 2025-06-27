package com.microservice.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private String imageUrl;
    private String category;
    private Double basePrice;
    private Long userId;
    private String status;
    private Boolean visible;
}