package com.MatchMyMovie.api.service;

import com.MatchMyMovie.api.entity.Swipe;
import com.MatchMyMovie.api.entity.User;
import com.MatchMyMovie.api.model.swipe.SwipeCreationDTO;
import com.MatchMyMovie.api.model.swipe.SwipeDTO;
import com.MatchMyMovie.api.model.user.UserDTO;
import com.MatchMyMovie.api.repository.SwipeRepository;
import org.springframework.stereotype.Service;

@Service
public class SwipeService {

    private final SwipeRepository swipeRepository;
    private final UserService userService;

    public SwipeService(SwipeRepository swipeRepository, UserService userService) {
        this.swipeRepository = swipeRepository;
        this.userService = userService;
    }

    public SwipeDTO saveSwipe(SwipeCreationDTO swipe) {
        Swipe newSwipe = new Swipe();
        User user = this.userService.getAuthenticatedUser();

        newSwipe.setMovieId(swipe.movieId());
        newSwipe.setLiked(swipe.liked());
        newSwipe.setUser(user);

        Swipe savedSwipe = this.swipeRepository.save(newSwipe);

        return new SwipeDTO(savedSwipe.getId(), savedSwipe.getMovieId(), new UserDTO(user.getId(), user.getUsername(), user.getEmail()), savedSwipe.isLiked());
    }
}
