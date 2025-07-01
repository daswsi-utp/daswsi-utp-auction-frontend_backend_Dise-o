package com.microservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.microservice.model.Transaction;
import com.microservice.model.TransactionStatus;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByAuctionId(Long auctionId);
    List<Transaction> findByBuyerId(Long buyerId);
    List<Transaction> findByStatus(TransactionStatus status);
    List<Transaction> findByVisibleTrue();
}
