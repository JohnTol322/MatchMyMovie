import React from "react";
import "./MovieSearchResult.scss";

const MovieSearchResult = () => {
    return (
        <div className="movie-result">
            <div className="movie-poster">
                {/*<img src={require("../../../assets/images/movie-poster.jpg")} alt="Movie Poster"/>*/}
                <div className="movie-poster"></div>
            </div>
            <div className="movie-info">
                <div>
                    <b className="movie-title">The Shawshank Redemption</b>
                    <p className="release-date">01 Januari, 2000</p>
                </div>
                <p className="movie-description">Two imprisoned</p>
            </div>
        </div>
    );
}

export default MovieSearchResult;