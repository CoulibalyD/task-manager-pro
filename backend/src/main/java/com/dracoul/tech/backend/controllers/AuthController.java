package com.dracoul.tech.backend.controllers;

import com.dracoul.tech.backend.dto.JwtResponse;
import com.dracoul.tech.backend.dto.LoginRequest;
import com.dracoul.tech.backend.dto.RegisterRequest;
import com.dracoul.tech.backend.entities.User;
import com.dracoul.tech.backend.security.CustomUserDetails;
import com.dracoul.tech.backend.security.JwtService;
import com.dracoul.tech.backend.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<JwtResponse> register(@RequestBody RegisterRequest request) {
        JwtResponse jwtResponse = authService.register(request);
        return ResponseEntity.ok(jwtResponse);
    }


    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody @Valid LoginRequest request) {
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        var userDetails = (CustomUserDetails) authentication.getPrincipal();
        var user = userDetails.getUser();

        var token = jwtService.generateToken(user);

        var response = JwtResponse.builder()
                .token(token)
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .roles(List.of(user.getRole().getName().name()))
                .build();

        return ResponseEntity.ok(response);
    }


}
