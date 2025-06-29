package com.microservice.microservice_auction.repository;

import com.microservice.microservice_auction.model.Auction;
import com.microservice.microservice_auction.model.AuctionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AuctionRepository extends JpaRepository<Auction, Long> {
    List<Auction> findByStatus(AuctionStatus status);
    List<Auction> findByVisibleTrue();
    List<Auction> findByProductId(Long productId);

}
