package com.MatchMyMovie.api.entity.user;

import java.util.Date;

public record UserDTO(Long id, String username, String email, Date createdOn) { }
