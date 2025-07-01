package com.microservice.model;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transaction")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Transaction {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="auction_id", nullable=false)
    private Long auctionId;

    @Column(name="buyer_id", nullable=false)
    private Long buyerId;

    @Column(name="final_amount")
    private Double finalAmount;

    @Column(name="transaction_date", nullable=false)
    private LocalDateTime transactionDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionStatus status;  // PAID, PENDING, CANCELED

    @Column(nullable = false)
    private Boolean visible;

    @PrePersist
    public void prePersist() {
        if (visible == null) visible = true;
        if (transactionDate == null) transactionDate = LocalDateTime.now();
        if (status == null) status = TransactionStatus.PENDING;
    }
}
