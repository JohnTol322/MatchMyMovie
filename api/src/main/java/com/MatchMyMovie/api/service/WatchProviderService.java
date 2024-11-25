package com.MatchMyMovie.api.service;

import com.MatchMyMovie.api.model.movie.WatchProvider;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchProviderService {

    private final TmdbApiService tmdbApiService;

    public WatchProviderService(TmdbApiService tmdbApiService) {
        this.tmdbApiService = tmdbApiService;
    }

    public List<WatchProvider> getWatchProviders(Integer maxPriorityScore) {
        return tmdbApiService.getWatchProviders().stream()
                .filter(watchProvider -> watchProvider.getDisplayPriority() <= maxPriorityScore)
                .toList();
    }
}
