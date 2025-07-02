package com.microservice.service;

import com.microservice.entity.*;
import com.microservice.factory.BiddingStrategyFactory;
import com.microservice.strategy.BiddingStrategy;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.*;
import java.util.concurrent.*;

@Service
public class AuctionEngineService {

    private AuctionState currentState;
    private ScheduledExecutorService scheduler;
    private ScheduledFuture<?> machineTask;
    private ScheduledFuture<?> timerTask;
    private boolean auctionEnded = false;

    private static final int DURATION_SECONDS = 30;

    @PostConstruct
    public void init() {
        scheduler = Executors.newScheduledThreadPool(2);
    }

    public synchronized AuctionState startAuction(StrategyType type) {
        currentState = AuctionState.builder()
                .strategy(type)
                .remainingTime(DURATION_SECONDS)
                .bidHistory(new ArrayList<>())
                .recommendation("Subasta iniciada con estrategia “" + type.name() + "”. ¡Buena suerte!")
                .winner(null)
                .build();

        auctionEnded = false;
        if (machineTask != null) machineTask.cancel(true);
        if (timerTask != null) timerTask.cancel(true);

        // Temporizador de subasta
        timerTask = scheduler.scheduleAtFixedRate(() -> {
            int time = currentState.getRemainingTime();
            if (time > 0) {
                currentState.setRemainingTime(time - 1);
            } else {
                finishAuction();
            }
        }, 1, 1, TimeUnit.SECONDS);

        // Máquina puja con estrategia
        BiddingStrategy strategy = BiddingStrategyFactory.getStrategy(type);
        machineTask = scheduler.scheduleAtFixedRate(() -> {
            if (!auctionEnded && currentState.getRemainingTime() > 0 && currentState.getWinner() == null) {
                strategy.executeBid(currentState);
            }
        }, 3, 5, TimeUnit.SECONDS);

        return currentState;
    }

    public synchronized AuctionState placeUserBid(int amount) {
        if (auctionEnded || currentState == null) {
            return createMessage("La subasta ha finalizado.");
        }

        List<Bid> history = currentState.getBidHistory();
        Bid last = history.isEmpty() ? null : history.get(history.size() - 1);
        int lastAmount = last != null ? last.getAmount() : 0;

        if (amount <= lastAmount) {
            return createMessage("Tu puja debe ser mayor que la última (" + lastAmount + ").");
        }

        // Solo para AGGRESSIVE: comprobar victoria inmediata si puja >= 2x última de máquina
        if (currentState.getStrategy() == StrategyType.AGGRESSIVE) {
            Bid prevMachine = null;
            for (int i = history.size() - 1; i >= 0; i--) {
                if ("Machine".equals(history.get(i).getBidder())) {
                    prevMachine = history.get(i);
                    break;
                }
            }
            int machineAmount = prevMachine != null ? prevMachine.getAmount() : 0;

            if (amount >= machineAmount * 2) {
                // Victoria con ventaja clara
                Bid userBid = new Bid("Usuario", amount, LocalTime.now());
                currentState.getBidHistory().add(userBid);
                finishAuction();
                return currentState;
            }
        }

        // Registro normal de la puja del usuario
        Bid userBid = new Bid("Usuario", amount, LocalTime.now());
        currentState.getBidHistory().add(userBid);

        if (currentState.getRemainingTime() > 1 && !auctionEnded) {
            currentState.setRecommendation("Puja registrada: espera la reacción de la máquina.");
        }

        return currentState;
    }

    public synchronized AuctionState getAuctionState() {
        if (currentState != null && currentState.getRemainingTime() == 0) {
            finishAuction();
        }
        return currentState;
    }

    private synchronized void finishAuction() {
        auctionEnded = true;
        if (machineTask != null) machineTask.cancel(true);
        if (timerTask != null) timerTask.cancel(true);

        currentState.setRemainingTime(0);
        List<Bid> bids = currentState.getBidHistory();
        if (bids.isEmpty()) {
            currentState.setWinner("Nadie");
            currentState.setRecommendation("No hubo pujas. Subasta finalizada.");
            return;
        }

        Bid last = bids.get(bids.size() - 1);
        String winner = last.getBidder();
        currentState.setWinner(winner);

        if ("Usuario".equals(winner)) {
            if (currentState.getStrategy() == StrategyType.AGGRESSIVE) {
                // Determinar última puja de máquina
                Bid prevMachine = null;
                for (int i = bids.size() - 2; i >= 0; i--) {
                    if ("Machine".equals(bids.get(i).getBidder())) {
                        prevMachine = bids.get(i);
                        break;
                    }
                }
                int machineAmount = prevMachine != null ? prevMachine.getAmount() : 0;
                int userAmount = last.getAmount();
                // Umbral 2x: ventaja clara
                if (userAmount >= machineAmount * 2) {
                    currentState.setRecommendation("¡Excelente! Pujaste tan alto que nadie más se animó y ganaste la subasta.");
                } else {
                    currentState.setRecommendation("¡Felicidades! Ganaste la subasta con buena estrategia agresiva.");
                }
            } else {
                currentState.setRecommendation("¡Felicidades! Ganaste la subasta.");
            }
        } else {
            switch (currentState.getStrategy()) {
                case AGGRESSIVE ->
                    currentState.setRecommendation("Perdiste esta vez. En agresiva, puja más rápido y constante o con montos más altos para ganarle.");
                case BALANCED ->
                    currentState.setRecommendation("La máquina ganó. En intermedia, no pujes ni muy pronto ni muy tarde: ajusta mejor tus incrementos.");
                case CONSERVATIVE ->
                    currentState.setRecommendation("La máquina ganó. En conservadora, gestiona mejor el tiempo y puja cerca del final.");
            }
        }
    }

    private AuctionState createMessage(String message) {
        currentState.setRecommendation(message);
        return currentState;
    }
}
