package com.MatchMyMovie.api.controller;

import com.MatchMyMovie.api.model.ApiResponse;
import com.MatchMyMovie.api.model.movie.Movie;
import com.MatchMyMovie.api.service.MovieService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping()
    public ApiResponse<List<Movie>> getMovies() {
        try {
            return new ApiResponse<>("Movies successfully retrieved", movieService.getMovies(), 200);
        } catch (Exception e) {
            return new ApiResponse<>(e.getMessage(), null, 500);
        }
    }
}
