package com.MatchMyMovie.api.service;

import com.MatchMyMovie.api.model.movie.Genre;
import org.springframework.stereotype.Service;

@Service
public class GenreService {

    private final TmdbApiService tmdbApiService;

    public GenreService(TmdbApiService tmdbApiService) {
        this.tmdbApiService = tmdbApiService;
    }

    public Genre[] getAllMovieGenres() {
        return tmdbApiService.getAllMovieGenres();
    }
}
