package com.MatchMyMovie.api.service;

import com.MatchMyMovie.api.entity.Swipe;
import com.MatchMyMovie.api.entity.User;
import com.MatchMyMovie.api.entity.UserPreference;
import com.MatchMyMovie.api.model.swipe.SwipeCreationDTO;
import com.MatchMyMovie.api.model.swipe.SwipeDTO;
import com.MatchMyMovie.api.repository.SwipeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class SwipeService {

    private final SwipeRepository swipeRepository;
    private final UserService userService;
    private final UserPreferenceService userPreferenceService;

    public SwipeService(
            SwipeRepository swipeRepository,
            UserService userService,
            UserPreferenceService userPreferenceService
    ) {
        this.swipeRepository = swipeRepository;
        this.userService = userService;
        this.userPreferenceService = userPreferenceService;
    }

    public SwipeDTO saveSwipe(SwipeCreationDTO swipe) {
        // Get the authenticated user
        User user = this.userService.getAuthenticatedUser();

        Swipe newSwipe = new Swipe();
        newSwipe.setMovieId(swipe.movieId());
        newSwipe.setLiked(swipe.liked());
        newSwipe.setUser(user);

        List<UserPreference> preferences = user.getUserPreferences();

        swipe.genreIds().forEach(genreId -> preferences.stream()
                .filter(preference -> Objects.equals(preference.getGenreId(), genreId))
                .findAny()
                .ifPresentOrElse(
                        preference -> preference.addPreferenceScore(swipe.liked() ? 1 : -1),
                        // If the user preference does not exist, create a new one
                        () -> userPreferenceService.saveUserPreferenceBySwipe(newSwipe, genreId)
                ));

        // Save the updated user preferences
        this.userPreferenceService.saveUserPreferences(preferences);
        
        Swipe savedSwipe = this.swipeRepository.save(newSwipe);

        return new SwipeDTO(savedSwipe.getId(), savedSwipe.getMovieId(), user.getId(), savedSwipe.isLiked());
    }
}
