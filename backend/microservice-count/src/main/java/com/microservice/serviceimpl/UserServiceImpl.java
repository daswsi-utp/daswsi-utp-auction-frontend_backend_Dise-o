package com.microservice.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.microservice.dto.UserDTO;
import com.microservice.exception.ResourceNotFoundException;
import com.microservice.model.User;
import com.microservice.model.UserStatus;
import com.microservice.repository.UserRepository;
import com.microservice.service.UserService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repo;

    private UserDTO toDto(User u) {
        return UserDTO.builder()
            .id(u.getId())
            .name(u.getName())
            .email(u.getEmail())
            .passwordHash(u.getPasswordHash())
            .registrationDate(u.getRegistrationDate())
            .status(u.getStatus())
            .visible(u.getVisible())
            .build();
    }

    private User toEntity(UserDTO d) {
        return User.builder()
            .id(d.getId())
            .name(d.getName())
            .email(d.getEmail())
            .passwordHash(d.getPasswordHash())
            .registrationDate(d.getRegistrationDate())
            .status(d.getStatus())
            .visible(d.getVisible())
            .build();
    }

    @Override
    public UserDTO create(UserDTO dto) {
        return toDto(repo.save(toEntity(dto)));
    }

    @Override
    public UserDTO getById(Long id) {
        User u = repo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        return toDto(u);
    }

    @Override
    public List<UserDTO> getAll() {
        return repo.findByVisibleTrue()
            .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<UserDTO> getByStatus(UserStatus status) {
        return repo.findByStatus(status)
            .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public UserDTO update(Long id, UserDTO dto) {
        User u = repo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        u.setName(dto.getName());
        u.setEmail(dto.getEmail());
        u.setPasswordHash(dto.getPasswordHash());
        u.setStatus(dto.getStatus());
        u.setVisible(dto.getVisible());
        return toDto(repo.save(u));
    }

    @Override
    public void delete(Long id) {
        User u = repo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        u.setVisible(false);
        repo.save(u);
    }
}