package com.microservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.microservice.dto.PaymentMethodDTO;
import com.microservice.service.PaymentMethodService;

import java.util.List;

@RestController
@RequestMapping("/payment-methods")
public class PaymentMethodController {

    @Autowired
    private PaymentMethodService service;

    @PostMapping
    public ResponseEntity<PaymentMethodDTO> create(@RequestBody PaymentMethodDTO dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentMethodDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<PaymentMethodDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PaymentMethodDTO>> byUser(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getByUser(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaymentMethodDTO> update(@PathVariable Long id, @RequestBody PaymentMethodDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}