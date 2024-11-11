package com.MatchMyMovie.api.service;

import com.MatchMyMovie.api.model.movie.Movie;
import com.MatchMyMovie.api.model.movie.MovieDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {

    private final TmdbApiService tmdbApiService;

    public MovieService(TmdbApiService tmdbApiService) {
        this.tmdbApiService = tmdbApiService;
    }

    public List<Movie> getMovies() {
        return tmdbApiService.discoverMovies().getResults();
    }

    public MovieDetails getMovieDetails(Long id) {
        return tmdbApiService.getMovieDetails(id);
    }
}
