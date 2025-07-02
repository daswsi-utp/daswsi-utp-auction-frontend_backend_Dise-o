package com.microservice.controller;

import com.microservice.entity.AuctionState;
import com.microservice.service.AuctionSimulatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/simulate")
@RequiredArgsConstructor
public class AuctionSimulatorController {

    private final AuctionSimulatorService simulatorService;

    @PostMapping
    public ResponseEntity<AuctionState> simulate(@RequestBody AuctionState auctionState) {
        AuctionState updatedState = simulatorService.simulateBid(auctionState);
        return ResponseEntity.ok(updatedState);
    }
}
