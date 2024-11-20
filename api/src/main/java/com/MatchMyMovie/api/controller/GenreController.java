package com.MatchMyMovie.api.controller;

import com.MatchMyMovie.api.model.ApiResponse;
import com.MatchMyMovie.api.model.movie.Genre;
import com.MatchMyMovie.api.service.GenreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/genres")
public class GenreController {
    private final GenreService genreService;

    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Genre[]>> getAllMovieGenres() {
        try {
            return ResponseEntity.ok(new ApiResponse<>("Successfully retrieved all movie genres", genreService.getAllMovieGenres(), 200));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse<>(e.getMessage(), null, 500));
        }
    }
}
