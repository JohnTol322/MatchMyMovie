package com.MatchMyMovie.api.service;

import com.MatchMyMovie.api.entity.Swipe;
import com.MatchMyMovie.api.entity.User;
import com.MatchMyMovie.api.entity.UserPreference;
import com.MatchMyMovie.api.repository.UserPreferenceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserPreferenceService {

    private final UserPreferenceRepository userPreferenceRepository;
    private final UserService userService;

    public UserPreferenceService(UserPreferenceRepository userPreferenceRepository, UserService userService) {
        this.userPreferenceRepository = userPreferenceRepository;
        this.userService = userService;
    }

    public void saveUserPreferences(Iterable<UserPreference> userPreferences) {
        this.userPreferenceRepository.saveAll(userPreferences);
    }

    public void saveUserPreferenceBySwipe(Swipe swipe, Integer genreId) {
        UserPreference userPreference = new UserPreference();
        userPreference.setGenreId(genreId);
        userPreference.setUser(swipe.getUser());
        userPreference.setPreferenceScore(swipe.isLiked() ? 1 : -1);

        this.userPreferenceRepository.save(userPreference);
    }

    public List<UserPreference> getUserPreferencesByAuthenticatedUser() {
        User authenticatedUser = this.userService.getAuthenticatedUser();
        return authenticatedUser.getUserPreferences();
    }
}
