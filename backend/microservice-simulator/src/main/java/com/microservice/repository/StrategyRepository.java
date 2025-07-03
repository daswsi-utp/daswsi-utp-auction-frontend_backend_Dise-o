package com.microservice.repository;

import com.microservice.entity.StrategyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StrategyRepository extends JpaRepository<StrategyEntity, Integer> {
}
