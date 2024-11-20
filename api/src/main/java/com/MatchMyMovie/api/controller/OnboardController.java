package com.MatchMyMovie.api.controller;

import com.MatchMyMovie.api.model.ApiResponse;
import com.MatchMyMovie.api.model.Onboarding;
import com.MatchMyMovie.api.service.OnboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/api/onboard")
public class OnboardController {

    private final OnboardService onboardService;

    public OnboardController(OnboardService onboardService) {
        this.onboardService = onboardService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Onboarding>> onboardAuthenticatedUser(@RequestBody Onboarding onboarding) {
        try {
            onboardService.onboardAuthenticatedUser(onboarding);
            return ResponseEntity.ok(new ApiResponse<>("User onboarded successfully", null, 200));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>("Failed to onboard user", null, 400));
        }
    }
}
