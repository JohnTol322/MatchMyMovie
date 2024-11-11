package com.MatchMyMovie.api.model.movie;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class MovieDetails extends Movie {
    private Integer runtime;
    private String tagline;
    private MovieCollection belongsToCollection;
    private String status;
    private String homepage;
    @JsonProperty("imdb_id")
    private String imdbId;
    private String budget;
    private String revenue;
    private List<Genre> genres;

    public MovieDetails() {
    }

    public Integer getRuntime() {
        return runtime;
    }

    public void setRuntime(Integer runtime) {
        this.runtime = runtime;
    }

    public String getTagline() {
        return tagline;
    }

    public void setTagline(String tagline) {
        this.tagline = tagline;
    }

    public MovieCollection getBelongsToCollection() {
        return belongsToCollection;
    }

    public void setBelongsToCollection(MovieCollection belongsToCollection) {
        this.belongsToCollection = belongsToCollection;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getHomepage() {
        return homepage;
    }

    public void setHomepage(String homepage) {
        this.homepage = homepage;
    }

    public String getImdbId() {
        return imdbId;
    }

    public void setImdbId(String imdbId) {
        this.imdbId = imdbId;
    }

    public String getBudget() {
        return budget;
    }

    public void setBudget(String budget) {
        this.budget = budget;
    }

    public String getRevenue() {
        return revenue;
    }

    public void setRevenue(String revenue) {
        this.revenue = revenue;
    }

    public List<Genre> getGenres() {
        return genres;
    }

    public void setGenres(List<Genre> genres) {
        this.genres = genres;
    }
}
