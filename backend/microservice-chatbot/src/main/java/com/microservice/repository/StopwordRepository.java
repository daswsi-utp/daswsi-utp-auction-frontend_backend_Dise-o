package com.microservice.repository;

import com.microservice.entity.Stopword;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StopwordRepository extends JpaRepository<Stopword, Long> {
}
