package com.dracoul.tech.backend.services;

import com.dracoul.tech.backend.dto.RegisterRequest;
import com.dracoul.tech.backend.dto.JwtResponse;
import com.dracoul.tech.backend.entities.Role;
import com.dracoul.tech.backend.entities.User;
import com.dracoul.tech.backend.enums.RoleType;
import com.dracoul.tech.backend.repositories.RoleRepository;
import com.dracoul.tech.backend.repositories.UserRepository;
import com.dracoul.tech.backend.security.JwtService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public JwtResponse register(RegisterRequest request) {
        // Vérifie si l'utilisateur existe déjà
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email déjà utilisé");
        }

        // Recherche du rôle dans la base à partir du nom fourni
        Role role = roleRepository.findByName(
                RoleType.valueOf(request.getRole().toUpperCase())
        ).orElseThrow(() -> new IllegalArgumentException("Rôle invalide : " + request.getRole()));

        // Construction de l'utilisateur avec le rôle trouvé
        List<Role> roles = List.of(role);

        User user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(roles)
                .enabled(true)
                .build();

        userRepository.save(user);

        // Génère le JWT
        String token = jwtService.generateToken(user);

        return JwtResponse.builder()
                .token(token)
                .build();
    }


}
