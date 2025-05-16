package com.dracoul.tech.backend.services;

import com.dracoul.tech.backend.dto.TaskDto;
import com.dracoul.tech.backend.entities.Task;
import com.dracoul.tech.backend.entities.User;
import com.dracoul.tech.backend.repositories.TaskRepository;
import com.dracoul.tech.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskDto createTask(TaskDto dto, Long userId) {
        Task task = Task.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .dueDate(dto.getDueDate())
                .completed(false)
                .userId(userId)
                .build();

        return toDto(taskRepository.save(task));
    }

    public List<TaskDto> getTasksForUser(Long userId) {
        return taskRepository.findByUserId(userId)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public TaskDto updateTask(Long id, TaskDto dto, Long userId) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Tâche non trouvée"));

        // On s'assure que l'utilisateur est bien le propriétaire
        if (!task.getUserId().equals(userId)) {
            throw new SecurityException("Accès refusé");
        }

        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setDueDate(dto.getDueDate());
        task.setCompleted(dto.isCompleted());

        return toDto(taskRepository.save(task));
    }


    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public TaskDto toDto(Task task) {
        return TaskDto.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .dueDate(task.getDueDate())
                .completed(task.isCompleted())
                .build();
    }

    public List<Task> getTasksForCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));
        return taskRepository.findByUserId(user.getId());
    }

}


