package com.microservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.microservice.dto.TransactionDTO;
import com.microservice.model.TransactionStatus;
import com.microservice.service.TransactionService;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionService service;

    @PostMapping
    public ResponseEntity<TransactionDTO> create(@RequestBody TransactionDTO dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<TransactionDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/auction/{auctionId}")
    public ResponseEntity<List<TransactionDTO>> byAuction(@PathVariable Long auctionId) {
        return ResponseEntity.ok(service.getByAuction(auctionId));
    }

    @GetMapping("/buyer/{buyerId}")
    public ResponseEntity<List<TransactionDTO>> byBuyer(@PathVariable Long buyerId) {
        return ResponseEntity.ok(service.getByBuyer(buyerId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<TransactionDTO>> byStatus(@PathVariable TransactionStatus status) {
        return ResponseEntity.ok(service.getByStatus(status));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransactionDTO> update(@PathVariable Long id, @RequestBody TransactionDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
