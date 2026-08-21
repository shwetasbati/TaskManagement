
package com.example.taskmanagement.controller;

import com.example.taskmanagement.entity.Task;
import com.example.taskmanagement.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin("*")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

 @PostMapping("/user/{userId}")
public Task createTask(
        @PathVariable Long userId,
        @RequestBody Task task) {

    return taskService.createTask(userId, task);
}

  
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

  
    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

  
    @PutMapping("/{id}")
    public Task updateTask(
            @PathVariable Long id,
            @RequestBody Task task) {

        return taskService.updateTask(id, task);
    }

   
    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return "Task deleted successfully";
    }
    @GetMapping("/user/{userId}")
public List<Task> getTasksByUser(@PathVariable Long userId) {
    return taskService.getTasksByUser(userId);
}
}