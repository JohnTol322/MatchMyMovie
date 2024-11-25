package com.MatchMyMovie.api.model.movie;

import lombok.Data;

import java.util.List;

@Data
public class WatchProviderResponse {
    private List<WatchProvider> results;
}
