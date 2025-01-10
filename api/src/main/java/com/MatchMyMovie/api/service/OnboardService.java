package com.MatchMyMovie.api.service;

import com.MatchMyMovie.api.entity.User;
import com.MatchMyMovie.api.entity.UserPreference;
import com.MatchMyMovie.api.model.Onboarding;
import org.springframework.stereotype.Service;

@Service
public class OnboardService {

    private final UserService userService;
    private final UserPreferenceService userPreferenceService;

    public OnboardService(UserService userService, UserPreferenceService userPreferenceService) {
        this.userService = userService;
        this.userPreferenceService = userPreferenceService;
    }

    public void onboardAuthenticatedUser(Onboarding onboarding) {
        User user = this.userService.getAuthenticatedUser();

        onboarding.getGenreIds().forEach(genreId -> {
            UserPreference userPreference = new UserPreference();
            userPreference.setUser(user);
            userPreference.setGenreId(genreId);
            userPreference.setPreferenceScore(10);
            user.addUserPreference(userPreference);
        });
        user.setWatchProviderIds(onboarding.getWatchProviderIds());
        user.setFavoriteMovieId(onboarding.getFavoriteMovieId());
        user.setIsOnboarded(true);

        this.userPreferenceService.saveUserPreferences(user.getUserPreferences());
        this.userService.saveUser(user);
    }
}
