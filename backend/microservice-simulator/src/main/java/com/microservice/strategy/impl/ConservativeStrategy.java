package com.microservice.strategy.impl;

import com.microservice.entity.AuctionState;
import com.microservice.entity.Bid;
import com.microservice.strategy.BiddingStrategy;

import java.time.LocalTime;
import java.util.Random;

public class ConservativeStrategy implements BiddingStrategy {

    @Override
    public void executeBid(AuctionState state) {
        if (state.getRemainingTime() <= 0 || state.getWinner() != null) return;

        int time = state.getRemainingTime();
        if (time > 10) {
            state.setRecommendation("Estrategia conservadora: aguarda tu turno.");
            return;
        }
        if (time <= 4) {
            state.setRecommendation("Últimos segundos: ¡no dejes pasar tu oportunidad!");
            return;
        }

        Bid lastBid = state.getBidHistory().isEmpty() ? null
                : state.getBidHistory().get(state.getBidHistory().size() - 1);
        String lastBidder = lastBid != null ? lastBid.getBidder() : "";
        int lastAmount = lastBid != null ? lastBid.getAmount() : 0;

        if (!"Machine".equals(lastBidder)) {
            int increment = 1 + new Random().nextInt(3);
            int newAmount = lastAmount + increment;
            Bid machineBid = new Bid("Machine", newAmount, LocalTime.now());
            state.getBidHistory().add(machineBid);
            state.setRecommendation("La máquina (conservadora) pujó " + newAmount + ". ¡Piensa tu contraoferta!");
        }
    }
}
