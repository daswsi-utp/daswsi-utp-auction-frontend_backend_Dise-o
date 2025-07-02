package com.microservice.strategy;

import com.microservice.entity.AuctionState;

public interface BiddingStrategy {
    void executeBid(AuctionState state);
}
