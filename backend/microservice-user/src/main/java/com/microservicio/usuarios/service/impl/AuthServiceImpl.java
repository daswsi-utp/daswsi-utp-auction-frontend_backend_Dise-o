package com.microservicio.usuarios.service.impl;

import com.microservicio.usuarios.dto.AuthRequest;
import com.microservicio.usuarios.dto.AuthResponse;
import com.microservicio.usuarios.dto.RegisterRequest;
import com.microservicio.usuarios.model.AuthProvider;
import com.microservicio.usuarios.model.PasswordResetToken;
import com.microservicio.usuarios.model.User;
import com.microservicio.usuarios.repository.PasswordResetTokenRepository;
import com.microservicio.usuarios.repository.UserRepository;
import com.microservicio.usuarios.security.JwtService;
import com.microservicio.usuarios.service.AuthService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final JavaMailSender mailSender;
    private final UserDetailsService userDetailsService;

    @Override
    public AuthResponse register(RegisterRequest request) {
        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .provider(AuthProvider.LOCAL)
                .active(true)
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }

    @Override
    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        var jwtToken = jwtService.generateToken(userDetails);
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }

    @Override
    public void initiatePasswordReset(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        passwordResetTokenRepository.save(resetToken);

        sendPasswordResetEmail(user, token);
    }

    @Override
    public void completePasswordReset(String token, String newPassword) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token inválido"));

        if (resetToken.isExpired()) {
            throw new RuntimeException("Token expirado");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        passwordResetTokenRepository.delete(resetToken);
    }

    private void sendPasswordResetEmail(User user, String token) {
        try {
            String resetUrl = UriComponentsBuilder.newInstance()
                    .scheme("http")
                    .host("localhost:3000")
                    .path("/reset-password")
                    .queryParam("token", token)
                    .build().toUriString();

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom("noreply@subastas.com", "Soporte Subastas");
            helper.setTo(user.getEmail());
            helper.setSubject("Recuperación de contraseña");

            String content = "<p>Hola " + user.getName() + ",</p>"
                    + "<p>Has solicitado restablecer tu contraseña.</p>"
                    + "<p>Haz clic en el siguiente enlace para cambiar tu contraseña:</p>"
                    + "<p><a href=\"" + resetUrl + "\">Cambiar contraseña</a></p>"
                    + "<br>"
                    + "<p>Ignora este correo si no solicitaste este cambio.</p>";

            helper.setText(content, true);
            mailSender.send(message);
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException("Error al enviar el correo", e);
        }
    }
}