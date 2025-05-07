package com.dracoul.tech.backend.repositories;


import com.dracoul.tech.backend.entities.Role;
import com.dracoul.tech.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    @Query("SELECT u.role FROM User u WHERE u.id = :userId")
    Optional<Role> findRoleByUserId(@Param("userId") Long userId);


}
