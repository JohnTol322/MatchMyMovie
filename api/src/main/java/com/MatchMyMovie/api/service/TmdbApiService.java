package com.MatchMyMovie.api.service;

import com.MatchMyMovie.api.model.movie.Movie;
import com.MatchMyMovie.api.model.movie.MovieDetails;
import com.MatchMyMovie.api.model.movie.TmdbResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class TmdbApiService {

    private final String apiKey;
    private final RestTemplate restTemplate;
    private final StringHttpMessageConverter stringHttpMessageConverter;

    public TmdbApiService(RestTemplate restTemplate, @Value("${TMDB_API_KEY}") String apiKey, StringHttpMessageConverter stringHttpMessageConverter) {
        this.restTemplate = restTemplate;
        this.apiKey = apiKey;
        this.stringHttpMessageConverter = stringHttpMessageConverter;
    }

    public TmdbResponse discoverMovies() {
        String url = "https://api.themoviedb.org/3/discover/movie";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);

        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<TmdbResponse> response = restTemplate.exchange(url, HttpMethod.GET, entity, TmdbResponse.class);
        return response.getBody();
    }

    public MovieDetails getMovieDetails(Long id) {
        String url = "https://api.themoviedb.org/3/movie/" + id;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);

        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<MovieDetails> response = restTemplate.exchange(url, HttpMethod.GET, entity, MovieDetails.class);
        return response.getBody();
    }


}
