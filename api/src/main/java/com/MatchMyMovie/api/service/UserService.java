package com.MatchMyMovie.api.service;

import com.MatchMyMovie.api.entity.user.User;
import com.MatchMyMovie.api.entity.user.UserCreationDTO;
import com.MatchMyMovie.api.entity.user.UserDTO;
import com.MatchMyMovie.api.repository.UserRepository;
import com.MatchMyMovie.api.util.ValidationUtil;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDTO createUser(UserCreationDTO user) throws Exception {
        this.validateUser(user);

        User newUser = new User();
        newUser.setUsername(user.username());
        newUser.setPassword(user.password());
        newUser.setEmail(user.email());
        User savedUser = this.userRepository.saveAndFlush(newUser);

        return new UserDTO(savedUser.getId(), savedUser.getUsername(), savedUser.getEmail());
    }

    private void validateUser(UserCreationDTO user) throws Exception {
        if (!ValidationUtil.emailIsValid(user.email())) {
            throw new Exception("Invalid email address");
        }
        if (!ValidationUtil.isNullOrEmpty(user.username())) {
            throw new Exception("Fill in all fields");
        }
        if (!ValidationUtil.passwordIsValid(user.password())) {
            throw new Exception("Password must be at least 8 characters long");
        }
    }
}
