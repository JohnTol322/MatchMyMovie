package com.MatchMyMovie.api.service;

import com.MatchMyMovie.api.entity.User;
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
    private final UserService userService;

    public MovieService(TmdbApiService tmdbApiService, UserPreferenceService userPreferenceService, UserService userService) {
        this.tmdbApiService = tmdbApiService;
        this.userPreferenceService = userPreferenceService;
        this.userService = userService;
    }

    public List<Movie> getMovies(Integer page) {
        User user = userService.getAuthenticatedUser();
        if (!user.getIsOnboarded()) {
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
