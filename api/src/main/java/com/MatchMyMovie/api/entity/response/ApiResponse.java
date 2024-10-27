package com.MatchMyMovie.api.entity.response;

public record ApiResponse<T>(String message, T data, Integer status) { }
