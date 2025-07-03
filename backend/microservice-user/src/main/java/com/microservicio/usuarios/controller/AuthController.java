package com.microservicio.usuarios.controller;

import com.microservicio.usuarios.dto.AuthRequest;
import com.microservicio.usuarios.dto.AuthResponse;
import com.microservicio.usuarios.dto.RegisterRequest;
import com.microservicio.usuarios.dto.UserResponse;
import com.microservicio.usuarios.model.User;
import com.microservicio.usuarios.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(
  origins = "*",
  allowedHeaders = "*",
  methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS }
)
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final ModelMapper modelMapper;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal User user) {
        UserResponse response = modelMapper.map(user, UserResponse.class);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/password-reset/initiate")
    public ResponseEntity<Void> initiatePasswordReset(@RequestParam String email) {
        authService.initiatePasswordReset(email);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/password-reset/complete")
    public ResponseEntity<Void> completePasswordReset(
            @RequestParam String token,
            @RequestParam String newPassword) {
        authService.completePasswordReset(token, newPassword);
        return ResponseEntity.ok().build();
    }
}