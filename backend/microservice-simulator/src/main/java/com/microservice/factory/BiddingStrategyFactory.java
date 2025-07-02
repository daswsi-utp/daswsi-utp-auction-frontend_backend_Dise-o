package com.microservice.factory;

import com.microservice.entity.StrategyType;
import com.microservice.strategy.BiddingStrategy;
import com.microservice.strategy.impl.AggressiveStrategy;
import com.microservice.strategy.impl.BalancedStrategy;
import com.microservice.strategy.impl.ConservativeStrategy;

public class BiddingStrategyFactory {

    public static BiddingStrategy getStrategy(StrategyType type) {
        return switch (type) {
            case CONSERVATIVE -> new ConservativeStrategy();
            case AGGRESSIVE -> new AggressiveStrategy();
            case BALANCED -> new BalancedStrategy();
        };
    }
}
