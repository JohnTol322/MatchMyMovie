package com.MatchMyMovie.api.controller;

import com.MatchMyMovie.api.model.ApiResponse;
import com.MatchMyMovie.api.model.movie.Movie;
import com.MatchMyMovie.api.model.movie.MovieDetails;
import com.MatchMyMovie.api.service.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Movie>>> getMovies(@RequestParam(required = false) Integer page) {
        try {
            return ResponseEntity
                    .status(200)
                    .body(new ApiResponse<>("Movies successfully retrieved", this.movieService.getMovies(page), 200));
        } catch (Exception e) {
            return ResponseEntity
                    .status(500)
                    .body(new ApiResponse<>(e.getMessage(), null, 500));
        }
    }

    @GetMapping("/{id}/details")
    public ResponseEntity<ApiResponse<MovieDetails>> getMovieDetails(@PathVariable Long id) {
        try {
            return ResponseEntity
                    .status(200)
                    .body(new ApiResponse<>("Movie details successfully retrieved", this.movieService.getMovieDetails(id), 200));
        } catch (Exception e) {
            return ResponseEntity
                    .status(500)
                    .body(new ApiResponse<>(e.getMessage(), null, 500));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Movie>>> searchForMovie(@RequestParam String query) {
        try {
            return ResponseEntity
                    .status(200)
                    .body(new ApiResponse<>("Movies successfully retrieved", this.movieService.searchForMovie(query), 200));
        } catch (Exception e) {
            return ResponseEntity
                    .status(500)
                    .body(new ApiResponse<>(e.getMessage(), null, 500));
        }
    }
}
