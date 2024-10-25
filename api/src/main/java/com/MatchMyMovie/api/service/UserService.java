package com.MatchMyMovie.api.service;

import com.MatchMyMovie.api.entity.user.User;
import com.MatchMyMovie.api.entity.user.UserCreationDTO;
import com.MatchMyMovie.api.entity.user.UserDTO;
import com.MatchMyMovie.api.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDTO createUser(UserCreationDTO user) {
        User newUser = new User();
        newUser.setUsername(user.username());
        newUser.setPassword(user.password());
        newUser.setEmail(user.email());
        User savedUser = this.userRepository.saveAndFlush(newUser);

        return new UserDTO(savedUser.getId(), savedUser.getUsername(), savedUser.getEmail());
    }
}
