package com.microservicio.usuarios.service;

import com.microservicio.usuarios.dto.UserRequest;
import com.microservicio.usuarios.dto.UserResponse;
import com.microservicio.usuarios.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    UserResponse registerUser(UserRequest userRequest);
    UserResponse getUserById(Long id);
    UserResponse updateUser(Long id, UserRequest userRequest);
    void deleteUser(Long id);
    User processOAuthPostLogin(String email, String name);
}