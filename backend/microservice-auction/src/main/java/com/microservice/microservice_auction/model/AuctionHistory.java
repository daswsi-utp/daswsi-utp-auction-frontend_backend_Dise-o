package com.microservice.microservice_auction.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "auction_history")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class AuctionHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="user_id", nullable=false)
    private Long userId;

    @Column(name="auction_id", nullable=false)
    private Long auctionId;

    @Column(name="interaction_type", nullable=false)
    private String interactionType; // bid, purchase, watching

    private Double amount;

    @Column(nullable=false)
    private LocalDateTime date;

    @Column(nullable = false)
    private Boolean visible;

    @PrePersist
    public void prePersist() {
        if (visible == null) {
            visible = true;
        }
    }
}