package com.microservice.service;

import java.util.List;

import com.microservice.dto.PaymentMethodDTO;

public interface PaymentMethodService {
    PaymentMethodDTO create(PaymentMethodDTO dto);
    PaymentMethodDTO getById(Long id);
    List<PaymentMethodDTO> getAll();
    List<PaymentMethodDTO> getByUser(Long userId);
    PaymentMethodDTO update(Long id, PaymentMethodDTO dto);
    void delete(Long id);
}