package com.microservice.service;

import java.util.List;

import com.microservice.dto.UserDTO;
import com.microservice.model.UserStatus;

public interface UserService {
    UserDTO create(UserDTO dto);
    UserDTO getById(Long id);
    List<UserDTO> getAll();
    List<UserDTO> getByStatus(UserStatus status);
    UserDTO update(Long id, UserDTO dto);
    void delete(Long id);
}