package com.microservice.controller;

import com.microservice.entity.AuctionState;
import com.microservice.entity.StrategyType;
import com.microservice.service.AuctionEngineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auction")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuctionController {

    private final AuctionEngineService auctionEngineService;

    // Iniciar la subasta con estrategia
    @PostMapping("/iniciar")
    public ResponseEntity<AuctionState> iniciar(@RequestParam StrategyType estrategia) {
        AuctionState estado = auctionEngineService.startAuction(estrategia);
        return ResponseEntity.ok(estado);
    }

    // Pujar manualmente
    @PostMapping("/pujar")
    public ResponseEntity<AuctionState> pujar(@RequestParam int monto) {
        AuctionState estado = auctionEngineService.placeUserBid(monto);
        return ResponseEntity.ok(estado);
    }

    // Obtener estado actual
    @GetMapping("/estado")
    public ResponseEntity<AuctionState> estado() {
        AuctionState estado = auctionEngineService.getAuctionState();
        return ResponseEntity.ok(estado);
    }
}
