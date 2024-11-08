package com.MatchMyMovie.api.model;

public record ApiResponse<T>(String message, T data, Integer status) { }
