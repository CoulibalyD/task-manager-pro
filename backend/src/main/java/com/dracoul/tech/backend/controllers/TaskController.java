package com.dracoul.tech.backend.controllers;

import com.dracoul.tech.backend.dto.TaskDto;
import com.dracoul.tech.backend.entities.Task;
import com.dracoul.tech.backend.entities.User;
import com.dracoul.tech.backend.repositories.UserRepository;
import com.dracoul.tech.backend.services.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto dto, Principal principal) {
        Long userId = extractUserIdFromPrincipal(principal);
        return ResponseEntity.ok(taskService.createTask(dto, userId));
    }

    @GetMapping
    public ResponseEntity<List<TaskDto>> getUserTasks(Principal principal) {
        Long userId = extractUserIdFromPrincipal(principal);
        return ResponseEntity.ok(taskService.getTasksForUser(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDto> updateTask(@PathVariable Long id, @RequestBody TaskDto dto, Principal principal) {
        Long userId = extractUserIdFromPrincipal(principal);
        return ResponseEntity.ok(taskService.updateTask(id, dto, userId));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    private Long extractUserIdFromPrincipal(Principal principal) {
        String email = principal.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur introuvable"));

        return user.getId();
    }

    @GetMapping("/me")
    public ResponseEntity<List<Task>> getTasksForCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        List<Task> tasks = taskService.getTasksForCurrentUser(email);
        return ResponseEntity.ok(tasks);
    }
}

