package com.microservicio.usuarios.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class PasswordResetToken {
    private static final int EXPIRATION = 60 * 60 * 1000; // 1 hora

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    private Date expiryDate;

    public PasswordResetToken() {
        this.expiryDate = new Date(System.currentTimeMillis() + EXPIRATION);
    }

    public boolean isExpired() {
        return new Date().after(this.expiryDate);
    }
}