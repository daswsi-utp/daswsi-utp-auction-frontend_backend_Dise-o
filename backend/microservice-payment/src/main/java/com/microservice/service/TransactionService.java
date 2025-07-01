package com.microservice.service;

import java.util.List;

import com.microservice.dto.TransactionDTO;
import com.microservice.model.TransactionStatus;

public interface TransactionService {
    TransactionDTO create(TransactionDTO dto);
    TransactionDTO getById(Long id);
    List<TransactionDTO> getAll();
    List<TransactionDTO> getByAuction(Long auctionId);
    List<TransactionDTO> getByBuyer(Long buyerId);
    List<TransactionDTO> getByStatus(TransactionStatus status);
    TransactionDTO update(Long id, TransactionDTO dto);
    void delete(Long id);
}