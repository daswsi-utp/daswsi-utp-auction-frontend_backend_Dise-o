package com.microservice.strategy.impl;

import com.microservice.entity.AuctionState;
import com.microservice.entity.Bid;
import com.microservice.strategy.BiddingStrategy;

import java.time.LocalTime;
import java.util.Random;

public class AggressiveStrategy implements BiddingStrategy {

    @Override
    public void executeBid(AuctionState state) {
        
        if (state.getRemainingTime() <= 0 || state.getWinner() != null) return;

        Bid lastBid = state.getBidHistory().isEmpty() ? null
                : state.getBidHistory().get(state.getBidHistory().size() - 1);
        int lastAmount = lastBid != null ? lastBid.getAmount() : 0;
        int increment = 5 + new Random().nextInt(10);
        int newAmount = lastAmount + increment;

        Bid machineBid = new Bid("Machine", newAmount, LocalTime.now());
        state.getBidHistory().add(machineBid);

        if (state.getRemainingTime() > 1 && state.getWinner() == null) {
            state.setRecommendation("Recomendación: La máquina (Agresiva) pujó " + newAmount + ". ¡Intenta superarla rápido!");
        }
    }
}
