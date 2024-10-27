package com.MatchMyMovie.api.controller;

import com.MatchMyMovie.api.entity.LoginDetails;
import com.MatchMyMovie.api.entity.response.ApiResponse;
import com.MatchMyMovie.api.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<ApiResponse<String>> authenticate(@RequestBody LoginDetails loginDetails) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDetails.getEmail(), loginDetails.getPassword()));
            String token = jwtUtil.generateToken(loginDetails.getEmail());

            return ResponseEntity.ok(new ApiResponse<String>("Token generated successfully", token, 200));

        } catch (BadCredentialsException | UsernameNotFoundException e) {
            return ResponseEntity.status(401).body(new ApiResponse<>("Invalid credentials", null, 401));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse<>(e.getMessage(), null, 500));
        }
    }
}
