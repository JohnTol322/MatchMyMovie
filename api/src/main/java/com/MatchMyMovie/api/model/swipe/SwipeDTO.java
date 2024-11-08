package com.MatchMyMovie.api.model.swipe;

import com.MatchMyMovie.api.model.user.UserDTO;

public record SwipeDTO(Long id, Long movieId, Long userId, Boolean liked) { }
