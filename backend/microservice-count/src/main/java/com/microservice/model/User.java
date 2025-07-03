package com.microservice.model;



import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "User")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "registration_date", nullable = false)
    private LocalDateTime registrationDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserStatus status;

    @Column(nullable = false)
    private Boolean visible;

    @PrePersist
    public void prePersist() {
        if (registrationDate == null) {
            registrationDate = LocalDateTime.now();
        }
        if (status == null) {
            status = UserStatus.ACTIVE;
        }
        if (visible == null) {
            visible = true;
        }
    }
}
