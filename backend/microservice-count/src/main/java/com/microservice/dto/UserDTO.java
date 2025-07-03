package com.microservice.dto;


import lombok.*;
import java.time.LocalDateTime;
import com.microservice.model.UserStatus;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String passwordHash;
    private LocalDateTime registrationDate;
    private UserStatus status;
    private Boolean visible;
}