package com.microservice.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.microservice.dto.PaymentMethodDTO;
import com.microservice.exception.ResourceNotFoundException;
import com.microservice.model.PaymentMethod;
import com.microservice.repository.PaymentMethodRepository;
import com.microservice.service.PaymentMethodService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentMethodServiceImpl implements PaymentMethodService {

    @Autowired
    private PaymentMethodRepository repo;

    private PaymentMethodDTO toDto(PaymentMethod p) {
        return PaymentMethodDTO.builder()
            .id(p.getId())
            .userId(p.getUserId())
            .type(p.getType())
            .details(p.getDetails())
            .defaultMethod(p.getDefaultMethod())
            .visible(p.getVisible())
            .build();
    }

    private PaymentMethod toEntity(PaymentMethodDTO d) {
        return PaymentMethod.builder()
            .id(d.getId())
            .userId(d.getUserId())
            .type(d.getType())
            .details(d.getDetails())
            .defaultMethod(d.getDefaultMethod())
            .visible(d.getVisible())
            .build();
    }

    @Override
    public PaymentMethodDTO create(PaymentMethodDTO dto) {
        return toDto(repo.save(toEntity(dto)));
    }

    @Override
    public PaymentMethodDTO getById(Long id) {
        PaymentMethod p = repo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Método de pago no encontrado"));
        return toDto(p);
    }

    @Override
    public List<PaymentMethodDTO> getAll() {
        return repo.findByVisibleTrue()
            .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<PaymentMethodDTO> getByUser(Long userId) {
        return repo.findByUserId(userId)
            .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public PaymentMethodDTO update(Long id, PaymentMethodDTO dto) {
        PaymentMethod p = repo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Método de pago no encontrado"));
        p.setType(dto.getType());
        p.setDetails(dto.getDetails());
        p.setDefaultMethod(dto.getDefaultMethod());
        p.setVisible(dto.getVisible());
        return toDto(repo.save(p));
    }

    @Override
    public void delete(Long id) {
        PaymentMethod p = repo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Método de pago no encontrado"));
        p.setVisible(false);
        repo.save(p);
    }
}