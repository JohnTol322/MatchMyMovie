package com.MatchMyMovie.api.model;

import lombok.Data;

import java.util.List;

@Data
public class Onboarding {
    private List<Integer> genreIds;
    private List<Integer> watchProviderIds;
    private Integer favoriteMovieId;
}
