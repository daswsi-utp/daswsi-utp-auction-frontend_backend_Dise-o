package com.microservice.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.microservice.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByUserId(Long userId);
    List<Product> findByStatus(String status);
    List<Product> findByVisibleTrue();
}