package com.microservice.microservice_auction.controller;

import com.microservice.microservice_auction.dto.AuctionHistoryDTO;
import com.microservice.microservice_auction.service.AuctionHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/auction-history")
public class AuctionHistoryController {

    @Autowired
    private AuctionHistoryService service;

    @PostMapping
    public ResponseEntity<AuctionHistoryDTO> record(@RequestBody AuctionHistoryDTO dto) {
        return ResponseEntity.ok(service.record(dto));
    }

    @GetMapping("/auction/{auctionId}")
    public ResponseEntity<List<AuctionHistoryDTO>> byAuction(@PathVariable Long auctionId) {
        return ResponseEntity.ok(service.getByAuction(auctionId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AuctionHistoryDTO>> byUser(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getByUser(userId));
    }
}
