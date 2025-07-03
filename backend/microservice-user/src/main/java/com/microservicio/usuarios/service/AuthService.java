package com.microservicio.usuarios.service;

import com.microservicio.usuarios.dto.AuthRequest;
import com.microservicio.usuarios.dto.AuthResponse;
import com.microservicio.usuarios.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse authenticate(AuthRequest request);
    void initiatePasswordReset(String email);
    void completePasswordReset(String token, String newPassword);
}