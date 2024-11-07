package com.MatchMyMovie.api.controller;

import com.MatchMyMovie.api.model.ApiResponse;
import com.MatchMyMovie.api.model.swipe.SwipeCreationDTO;
import com.MatchMyMovie.api.model.swipe.SwipeDTO;
import com.MatchMyMovie.api.service.SwipeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/swipe")
public class SwipeController {

    private final SwipeService swipeService;

    public SwipeController(SwipeService swipeService) {
        this.swipeService = swipeService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<SwipeDTO>> saveSwipe(@RequestBody SwipeCreationDTO swipeCreationDTO) {
        try {
            SwipeDTO response = this.swipeService.saveSwipe(swipeCreationDTO);
            return ResponseEntity
                    .status(201)
                    .body(new ApiResponse<>("Swipe successfully saved", response, 201));
        } catch (Exception e) {
            return ResponseEntity
                    .status(400)
                    .body(new ApiResponse<>(e.getMessage(), null, 400));
        }
    }
}
