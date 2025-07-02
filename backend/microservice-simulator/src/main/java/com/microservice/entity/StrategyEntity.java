package com.microservice.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class StrategyEntity {

    @Id
    private Integer id;

    private String name;

    private String description;

    @Enumerated(EnumType.STRING)
    private StrategyType type;
}
