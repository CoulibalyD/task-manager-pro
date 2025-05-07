package com.dracoul.tech.backend.utils;

import com.dracoul.tech.backend.entities.Role;
import com.dracoul.tech.backend.entities.User;
import com.dracoul.tech.backend.enums.RoleType;
import com.dracoul.tech.backend.repositories.RoleRepository;
import com.dracoul.tech.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AdminInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (!userRepository.existsByEmail("admin@domain.com")) {

            Role adminRole = roleRepository.findByName(RoleType.ADMIN)
                    .orElseThrow(() -> new RuntimeException("Le rôle ADMIN n'existe pas."));

            User admin = User.builder()
                    .firstname("Admin")
                    .lastname("User")
                    .email("admin@domain.com")
                    .password(passwordEncoder.encode("adminPassword123"))
                    .roles(List.of(adminRole))
                    .enabled(true)
                    .build();

            userRepository.save(admin);
            System.out.println("✅ Admin créé avec succès !");
        }
    }

}
