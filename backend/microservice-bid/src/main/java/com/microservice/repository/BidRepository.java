package com.microservice.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.microservice.model.Bid;
import java.util.List;

public interface BidRepository extends JpaRepository<Bid, Long> {
    List<Bid> findByAuctionId(Long auctionId);
    List<Bid> findByUserId(Long userId);
    List<Bid> findByVisibleTrue();
}