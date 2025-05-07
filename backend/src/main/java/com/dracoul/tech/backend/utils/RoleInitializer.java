package com.dracoul.tech.backend.utils;

import com.dracoul.tech.backend.entities.Role;
import com.dracoul.tech.backend.enums.RoleType;
import com.dracoul.tech.backend.repositories.RoleRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RoleInitializer {

    private final RoleRepository roleRepository;

    @PostConstruct
    public void initRoles() {
        createRoleIfNotExists(RoleType.USER);
        createRoleIfNotExists(RoleType.ADMIN);
    }

    private void createRoleIfNotExists(RoleType roleType) {
        roleRepository.findByName(roleType).orElseGet(() -> {
            Role role = Role.builder().name(roleType).build();
            return roleRepository.save(role);
        });
    }
}
