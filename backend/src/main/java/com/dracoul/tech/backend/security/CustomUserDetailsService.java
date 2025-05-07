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

        // Charger les rôles manuellement
        List<Role> roles = roleRepository.findAllByUserId(user.getId());
        user.setRoles(roles);

        return new CustomUserDetails(user);
    }


}
