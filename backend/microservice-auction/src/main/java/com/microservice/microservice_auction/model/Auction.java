package com.microservice.microservice_auction.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "auction")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Auction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="product_id", nullable=false)
    private Long productId;

    @Column(name="start_date", nullable=false)
    private LocalDateTime startDate;

    @Column(name="end_date", nullable=false)
    private LocalDateTime endDate;

    @Column(name="initial_price", nullable=false)
    private Double initialPrice;

    @Column(name="current_price")
    private Double currentPrice;

    @Column(name="final_price")
    private Double finalPrice;

    @Column(name="winner_id")
    private Long winnerId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AuctionStatus status;

    @Column(nullable = false)
    private Boolean visible;

    @PrePersist
    public void prePersist() {
        if (visible == null) {
            visible = true;
        }
    }
}