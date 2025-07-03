package com.microservicio.usuarios.security;

import com.microservicio.usuarios.model.AuthProvider;
import com.microservicio.usuarios.model.User;
import com.microservicio.usuarios.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
public class CustomOidcUserService extends OidcUserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public CustomOidcUserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        OidcUser oidcUser = super.loadUser(userRequest);
        Map<String, Object> attributes = oidcUser.getAttributes();

        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");
        String picture = (String) attributes.get("picture");

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setName(name);
                    newUser.setEmail(email);
                    newUser.setProfileImage(picture);
                    newUser.setProvider(AuthProvider.GOOGLE);
                    newUser.setProviderId(oidcUser.getName());
                    newUser.setActive(true);
                    newUser.setEmailVerified(true);

                    String randomPassword = UUID.randomUUID().toString();
                    newUser.setPassword(passwordEncoder.encode(randomPassword));

                    return userRepository.save(newUser);
                });

        return oidcUser;
    }
}