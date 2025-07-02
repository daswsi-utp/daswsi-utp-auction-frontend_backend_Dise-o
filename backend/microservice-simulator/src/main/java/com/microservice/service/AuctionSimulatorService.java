package com.microservice.service;

import com.microservice.entity.AuctionState;
import com.microservice.entity.StrategyType;
import com.microservice.factory.BiddingStrategyFactory;
import com.microservice.strategy.BiddingStrategy;
import org.springframework.stereotype.Service;

@Service
public class AuctionSimulatorService {

    
    public AuctionState simulateBid(AuctionState state) {
        StrategyType type = state.getStrategy();

        if (type == null) {
            state.setRecommendation("No se ha definido una estrategia.");
            return state;
        }

        BiddingStrategy strategy = BiddingStrategyFactory.getStrategy(type);
        strategy.executeBid(state);

        return state;
    }
}
