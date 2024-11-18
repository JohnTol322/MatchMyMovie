package com.MatchMyMovie.api.model.swipe;

import java.util.List;

public record SwipeCreationDTO(Long movieId, Boolean liked, List<Integer> genreIds) { }
