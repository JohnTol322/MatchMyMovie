import React from "react";
import "./MovieSearch.scss";
import MovieSearchResult from "./MovieSearchResult/MovieSearchResult";

const MovieSearch: React.FC = () => {
    return (
        <div className="movie-search-container">
            <div className="searchbar">
                <input className="search-box" type="text" placeholder="Search for a movie"/>
                <button className="search-btn">
                    <img src={require("../../../assets/images/icons/search.png")} alt="Search Icon"/>
                </button>
            </div>
            <div className="movie-search-results">
                <MovieSearchResult />
                <MovieSearchResult />
                <MovieSearchResult />
                <MovieSearchResult />
            </div>
        </div>
    );
}

export default MovieSearch;