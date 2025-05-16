package com.dracoul.tech.backend.services;

import com.dracoul.tech.backend.dto.UserDto;
import com.dracoul.tech.backend.entities.User;
import com.dracoul.tech.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public boolean existsById(Long id) {
        return userRepository.existsById(id);
    }

    public UserDto toDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole().getName().name());
        return dto;
    }


    public User toEntity(UserDto dto) {
        return User.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .build();
    }

    public Optional<User> updateUser(Long id, User userData) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    existingUser.setFirstName(userData.getFirstName());
                    existingUser.setLastName(userData.getLastName());
                    existingUser.setEmail(userData.getEmail());
                    return userRepository.save(existingUser);
                });
    }
    public boolean updatePassword(Long userId, String oldPassword, String newPassword) {
        return userRepository.findById(userId).map(user -> {
            if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
                return false;
            }
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            return true;
        }).orElse(false);
    }


}
