package com.MatchMyMovie.api.controller;

import com.MatchMyMovie.api.entity.response.ApiResponse;
import com.MatchMyMovie.api.entity.user.UserCreationDTO;
import com.MatchMyMovie.api.entity.user.UserDTO;
import com.MatchMyMovie.api.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserDTO>> createUser(@RequestBody UserCreationDTO user) {
        try {
            UserDTO response = this.userService.createUser(user);
            return ResponseEntity
                    .status(201)
                    .body(new ApiResponse<>("User successfully created", response));
        } catch (Exception e) {
            return ResponseEntity
                    .status(400)
                    .body(new ApiResponse<>(e.getMessage(), null));
        }
    }
}