package com.microservice.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.microservice.model.PaymentMethod;

import java.util.List;

public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {
    List<PaymentMethod> findByUserId(Long userId);
    List<PaymentMethod> findByVisibleTrue();
    List<PaymentMethod> findByUserIdAndDefaultMethodTrue(Long userId);
}