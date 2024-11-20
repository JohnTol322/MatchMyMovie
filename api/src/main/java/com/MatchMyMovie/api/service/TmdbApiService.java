package com.MatchMyMovie.api.service;

import com.MatchMyMovie.api.model.movie.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.text.MessageFormat;
import java.util.List;
import java.util.Objects;

@Service
public class TmdbApiService {

    private final String apiKey;
    private final RestTemplate restTemplate;

    public TmdbApiService(RestTemplate restTemplate, @Value("${TMDB_API_KEY}") String apiKey) {
        this.restTemplate = restTemplate;
        this.apiKey = apiKey;
    }

    public TmdbResponse discoverMovies(Integer page, Integer preferredGenre) {

        if (page == null) {
            page = 1;
        }

        String url = "https://api.themoviedb.org/3/discover/movie?page={0}";
        String urlWithFilters = MessageFormat.format(url, page);

        if (preferredGenre != null) {
            urlWithFilters += "&with_genres=" + preferredGenre;
        }

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);

        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<TmdbResponse> response = restTemplate.exchange(urlWithFilters, HttpMethod.GET, entity, TmdbResponse.class);
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

    public Genre[] getAllMovieGenres() {
        String url = "https://api.themoviedb.org/3/genre/movie/list";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);

        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<GenreResponse> response = restTemplate.exchange(url, HttpMethod.GET, entity, GenreResponse.class);
        return Objects.requireNonNull(response.getBody()).getGenres();
    }

    public List<WatchProvider> getWatchProviders() {
        String url = "https://api.themoviedb.org/3/watch/providers/movie?watch_region=NL";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);

        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<WatchProviderResponse> response = restTemplate.exchange(url, HttpMethod.GET, entity, WatchProviderResponse.class);
        return Objects.requireNonNull(response.getBody()).getResults();
    }

    public TmdbResponse searchForMovie(String query) {
        String url = "https://api.themoviedb.org/3/search/movie?query={0}";
        String urlWithQuery = MessageFormat.format(url, query);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);

        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<TmdbResponse> response = restTemplate.exchange(urlWithQuery, HttpMethod.GET, entity, TmdbResponse.class);
        return response.getBody();
    }


}