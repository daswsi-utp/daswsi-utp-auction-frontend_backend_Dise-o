package com.microservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class AuctionState {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private StrategyType strategy;

    private int remainingTime;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<Bid> bidHistory = new ArrayList<>();

    private String recommendation;

    private String winner;
}
