package com.dracoul.tech.backend.security;

import com.dracoul.tech.backend.entities.Role;
import com.dracoul.tech.backend.entities.User;
import com.dracoul.tech.backend.repositories.RoleRepository;
import com.dracoul.tech.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));

        // Charger le rôle unique de l'utilisateur
        Role role = userRepository.findRoleByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Rôle non trouvé pour l'utilisateur"));

        user.setRole(role);

        return new CustomUserDetails(user);
    }



}
