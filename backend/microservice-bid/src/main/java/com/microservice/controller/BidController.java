package com.microservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.microservice.dto.BidDTO;
import com.microservice.service.BidService;

import java.util.List;


@RestController
@RequestMapping("/api/bids")
public class BidController {

    @Autowired
    private BidService service;

    @PostMapping
    public ResponseEntity<BidDTO> create(@RequestBody BidDTO dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BidDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<BidDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/auction/{auctionId}")
    public ResponseEntity<List<BidDTO>> byAuction(@PathVariable Long auctionId) {
        return ResponseEntity.ok(service.getByAuction(auctionId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BidDTO>> byUser(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getByUser(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BidDTO> update(@PathVariable Long id, @RequestBody BidDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}