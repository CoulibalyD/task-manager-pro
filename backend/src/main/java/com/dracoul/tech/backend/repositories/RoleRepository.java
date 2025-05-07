package com.dracoul.tech.backend.repositories;

import com.dracoul.tech.backend.entities.Role;
import com.dracoul.tech.backend.enums.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleType name);

    @Query(" SELECT r FROM User u JOIN u.roles r  WHERE u.id = :userId ")
    List<Role> findAllByUserId(@Param("userId") Long userId);
}
