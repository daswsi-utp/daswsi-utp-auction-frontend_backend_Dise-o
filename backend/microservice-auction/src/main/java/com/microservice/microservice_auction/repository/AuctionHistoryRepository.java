package com.microservice.microservice_auction.repository;

import com.microservice.microservice_auction.model.AuctionHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AuctionHistoryRepository extends JpaRepository<AuctionHistory, Long> {
    List<AuctionHistory> findByAuctionId(Long auctionId);
    List<AuctionHistory> findByUserId(Long userId);
}
