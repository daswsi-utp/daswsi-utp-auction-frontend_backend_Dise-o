package com.microservice.model;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bid")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Bid {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="auction_id", nullable=false)
    private Long auctionId;

    @Column(name="user_id", nullable=false)
    private Long userId;

    @Column(nullable=false)
    private Double amount;

    @Column(name="bid_date", nullable=false)
    private LocalDateTime bidDate;

    @Column(nullable = false)
    private Boolean visible;

    @PrePersist
    public void prePersist() {
        if (visible == null) {
            visible = true;
        }
        if (bidDate == null) {
            bidDate = LocalDateTime.now();
        }
    }
}