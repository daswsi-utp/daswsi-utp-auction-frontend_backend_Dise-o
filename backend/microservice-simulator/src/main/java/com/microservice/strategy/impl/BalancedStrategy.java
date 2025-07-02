package com.microservice.strategy.impl;

import com.microservice.entity.AuctionState;
import com.microservice.entity.Bid;
import com.microservice.strategy.BiddingStrategy;

import java.time.LocalTime;
import java.util.Random;

public class BalancedStrategy implements BiddingStrategy {

    @Override
    public void executeBid(AuctionState state) {
        if (state.getRemainingTime() <= 0 || state.getWinner() != null) return;

        int time = state.getRemainingTime();
        if (time <= 4) {
            state.setRecommendation("Últimos segundos: ¡aprovecha tu oportunidad!"); 
            return;
        }

        Bid lastBid = state.getBidHistory().isEmpty() ? null
                : state.getBidHistory().get(state.getBidHistory().size() - 1);
        String lastBidder = lastBid != null ? lastBid.getBidder() : "";
        int lastAmount = lastBid != null ? lastBid.getAmount() : 0;

        if ("Machine".equals(lastBidder)) {
            state.setRecommendation("Estrategia intermedia: espera un momento.");
            return;
        }

        int increment = 3 + new Random().nextInt(7);
        int newAmount = lastAmount + increment;
        Bid machineBid = new Bid("Machine", newAmount, LocalTime.now());
        state.getBidHistory().add(machineBid);

        state.setRecommendation("Recomendación: la máquina pujó " + newAmount + ". Tú decide si respondes.");
    }
}
