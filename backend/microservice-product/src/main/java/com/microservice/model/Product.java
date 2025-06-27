package com.microservice.model;

import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "product", indexes = {
    @Index(name = "idx_product_user", columnList = "user_id"),
    @Index(name = "idx_product_status", columnList = "status"),
    @Index(name = "idx_product_visible", columnList = "visible")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;

    private String category;

    @NotNull
    @Column(name = "base_price", nullable = false)
    private Double basePrice;

    @NotNull
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Builder.Default
    @Column(nullable = false)
    private Boolean visible = true;

    @PrePersist
    public void prePersist() {
        if (visible == null) {
            visible = true;
        }
    }
}
