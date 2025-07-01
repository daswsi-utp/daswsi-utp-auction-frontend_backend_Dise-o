package com.microservice.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.microservice.dto.TransactionDTO;
import com.microservice.exception.ResourceNotFoundException;
import com.microservice.model.Transaction;
import com.microservice.model.TransactionStatus;
import com.microservice.repository.TransactionRepository;
import com.microservice.service.TransactionService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository repo;

    private TransactionDTO toDto(Transaction t) {
        return TransactionDTO.builder()
            .id(t.getId())
            .auctionId(t.getAuctionId())
            .buyerId(t.getBuyerId())
            .finalAmount(t.getFinalAmount())
            .transactionDate(t.getTransactionDate())
            .status(t.getStatus())
            .visible(t.getVisible())
            .build();
    }

    private Transaction toEntity(TransactionDTO d) {
        return Transaction.builder()
            .id(d.getId())
            .auctionId(d.getAuctionId())
            .buyerId(d.getBuyerId())
            .finalAmount(d.getFinalAmount())
            .transactionDate(d.getTransactionDate())
            .status(d.getStatus())
            .visible(d.getVisible())
            .build();
    }

    @Override
    public TransactionDTO create(TransactionDTO dto) {
        return toDto(repo.save(toEntity(dto)));
    }

    @Override
    public TransactionDTO getById(Long id) {
        Transaction t = repo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Transacción no encontrada"));
        return toDto(t);
    }

    @Override
    public List<TransactionDTO> getAll() {
        return repo.findByVisibleTrue()
            .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<TransactionDTO> getByAuction(Long auctionId) {
        return repo.findByAuctionId(auctionId)
            .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<TransactionDTO> getByBuyer(Long buyerId) {
        return repo.findByBuyerId(buyerId)
            .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<TransactionDTO> getByStatus(TransactionStatus status) {
        return repo.findByStatus(status)
            .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public TransactionDTO update(Long id, TransactionDTO dto) {
        Transaction t = repo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Transacción no encontrada"));
        t.setFinalAmount(dto.getFinalAmount());
        t.setStatus(dto.getStatus());
        t.setVisible(dto.getVisible());
        return toDto(repo.save(t));
    }

    @Override
    public void delete(Long id) {
        Transaction t = repo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Transacción no encontrada"));
        t.setVisible(false);
        repo.save(t);
    }
}
