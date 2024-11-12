package com.MatchMyMovie.api.service;

import com.MatchMyMovie.api.entity.Swipe;
import com.MatchMyMovie.api.entity.UserPreference;
import com.MatchMyMovie.api.repository.UserPreferenceRepository;
import org.springframework.stereotype.Service;

@Service
public class UserPreferenceService {

    private final UserPreferenceRepository userPreferenceRepository;

    public UserPreferenceService(UserPreferenceRepository userPreferenceRepository) {
        this.userPreferenceRepository = userPreferenceRepository;
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
}
