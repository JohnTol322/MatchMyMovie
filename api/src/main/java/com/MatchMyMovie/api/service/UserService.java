package com.MatchMyMovie.api.service;

import com.MatchMyMovie.api.entity.user.User;
import com.MatchMyMovie.api.entity.user.UserCreationDTO;
import com.MatchMyMovie.api.entity.user.UserDTO;
import com.MatchMyMovie.api.repository.UserRepository;
import com.MatchMyMovie.api.util.ValidationUtil;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDTO createUser(UserCreationDTO user) throws Exception {
        this.validateUser(user);

        User newUser = new User();
        newUser.setUsername(user.username());
        newUser.setPassword(new BCryptPasswordEncoder().encode(user.password()));
        newUser.setEmail(user.email());
        User savedUser = this.userRepository.saveAndFlush(newUser);

        return new UserDTO(savedUser.getId(), savedUser.getUsername(), savedUser.getEmail());
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws BadCredentialsException {
        User user = this.userRepository.findByEmail(email);
        if (user == null) {
            throw new BadCredentialsException("User not found");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }

    private void validateUser(UserCreationDTO user) throws Exception {
        if (!ValidationUtil.emailIsValid(user.email())) {
            throw new Exception("Invalid email address");
        }
        if (ValidationUtil.isNullOrEmpty(user.username())) {
            throw new Exception("Fill in all fields");
        }
        if (!ValidationUtil.passwordIsValid(user.password())) {
            throw new Exception("Password must be at least 8 characters long");
        }
    }
}
