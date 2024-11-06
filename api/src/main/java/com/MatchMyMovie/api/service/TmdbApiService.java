package com.MatchMyMovie.api.service;

import com.MatchMyMovie.api.model.movie.Movie;
import com.MatchMyMovie.api.model.movie.TmdbResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TmdbApiService {

    private final String apiKey;
    private final RestTemplate restTemplate;

    public TmdbApiService(RestTemplate restTemplate, @Value("${TMDB_API_KEY}") String apiKey) {
        this.restTemplate = restTemplate;
        this.apiKey = apiKey;
    }

    public TmdbResponse discoverMovies() {
        String url = "https://api.themoviedb.org/3/discover/movie";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);

        HttpEntity entity = new HttpEntity(headers);

        ResponseEntity<TmdbResponse> response = restTemplate.exchange(url, HttpMethod.GET, entity, TmdbResponse.class);
        return response.getBody();
    }
}
