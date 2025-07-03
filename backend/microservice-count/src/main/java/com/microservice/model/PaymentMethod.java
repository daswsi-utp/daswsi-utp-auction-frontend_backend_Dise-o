package com.microservice.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "PaymentMethod")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PaymentMethod {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentMethodType type;

    private String details;

    @Column(name = "default_method", nullable = false)
    private Boolean defaultMethod;

    @Column(nullable = false)
    private Boolean visible;

    @PrePersist
    public void prePersist() {
        if (defaultMethod == null) {
            defaultMethod = false;
        }
        if (visible == null) {
            visible = true;
        }
    }
}