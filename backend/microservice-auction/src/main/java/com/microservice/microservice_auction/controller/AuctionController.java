package com.microservice.microservice_auction.controller;

import com.microservice.microservice_auction.dto.AuctionDTO;
import com.microservice.microservice_auction.model.AuctionStatus;
import com.microservice.microservice_auction.service.AuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/auctions")
public class AuctionController {

    @Autowired
    private AuctionService service;

    @PostMapping
    public ResponseEntity<AuctionDTO> create(@RequestBody AuctionDTO dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AuctionDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<AuctionDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<AuctionDTO>> getByStatus(@PathVariable AuctionStatus status) {
        return ResponseEntity.ok(service.getByStatus(status));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AuctionDTO> update(@PathVariable Long id, @RequestBody AuctionDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
