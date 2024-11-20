package com.MatchMyMovie.api.controller;

import com.MatchMyMovie.api.model.ApiResponse;
import com.MatchMyMovie.api.model.movie.WatchProvider;
import com.MatchMyMovie.api.service.WatchProviderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/watch-providers")
public class WatchProviderController {

    private final WatchProviderService watchProviderService;

    public WatchProviderController(WatchProviderService watchProviderService) {
        this.watchProviderService = watchProviderService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<WatchProvider>>> getWatchProviders(@RequestParam Integer maxPriorityScore) {
        try {
            List<WatchProvider> watchProviders = watchProviderService.getWatchProviders(maxPriorityScore);
            return ResponseEntity.ok(new ApiResponse<>(
                    "Successfully retrieved all watch providers with at least '" + maxPriorityScore + "' priority",
                    watchProviders,
                    200));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse<>(e.getMessage(), null, 500));
        }
    }
}
