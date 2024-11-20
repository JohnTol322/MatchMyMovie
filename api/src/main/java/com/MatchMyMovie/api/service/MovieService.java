package com.MatchMyMovie.api.service;

import com.MatchMyMovie.api.entity.UserPreference;
import com.MatchMyMovie.api.model.movie.Movie;
import com.MatchMyMovie.api.model.movie.MovieDetails;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    private final TmdbApiService tmdbApiService;
    private final UserPreferenceService userPreferenceService;
    private final SwipeService swipeService;

    public MovieService(TmdbApiService tmdbApiService, UserPreferenceService userPreferenceService, SwipeService swipeService) {
        this.tmdbApiService = tmdbApiService;
        this.userPreferenceService = userPreferenceService;
        this.swipeService = swipeService;
    }

    public List<Movie> getMovies(Integer page) {
        Integer swipeCount = swipeService.getSwipesCountByAuthenticatedUser();
        if (swipeCount < 15) {
            return tmdbApiService.discoverMovies(page, null).getResults();
        }

        List<UserPreference> preferenceProfile = userPreferenceService.getUserPreferencesByAuthenticatedUser();
        Optional<UserPreference> highestPreference = preferenceProfile.stream()
                .max(Comparator.comparingInt(UserPreference::getPreferenceScore));

        if (highestPreference.isEmpty()) {
            return tmdbApiService.discoverMovies(page, null).getResults();
        }

        return tmdbApiService.discoverMovies(page, highestPreference.get().getGenreId()).getResults();

    }

    public MovieDetails getMovieDetails(Long id) {
        return tmdbApiService.getMovieDetails(id);
    }

    public List<Movie> searchForMovie(String query) {
        return tmdbApiService.searchForMovie(query).getResults();
    }
}
