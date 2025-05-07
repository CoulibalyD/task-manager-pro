package com.dracoul.tech.backend.entities;

import com.dracoul.tech.backend.enums.RoleType;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private RoleType name;

    @OneToMany(mappedBy = "role")
    private List<User> users;
}
