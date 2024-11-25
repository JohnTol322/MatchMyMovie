import React from "react";
import "./MovieSearchResult.scss";
import {Movie} from "../../../../models/Movie";

interface MovieSearchResultProps {
    movie: Movie;
    isFavorite: boolean;
    setFavorite: (movie: Movie) => void;
}

const MovieSearchResult: React.FC<MovieSearchResultProps> = ({
                                                                 movie,
                                                                 isFavorite,
                                                                 setFavorite
                                                             }) => {

    const formatDate = (dateString: string) => {
        if (!dateString) {
            return "";
        }

        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {day: 'numeric', month: 'long', year: 'numeric'};
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    };

    return (
        <div className="movie-result">
            <div className="movie-poster">
                <img className="movie-poster" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                     alt="Movie Poster"/>
            </div>
            <div className="movie-info">
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div>
                        <b className="movie-title">{movie.title}</b>
                        <p className="release-date">{formatDate(movie.release_date)} • {movie.vote_average} /
                            10 <b>rating</b></p>
                    </div>
                    <button className="favorite-btn"
                            onClick={() => setFavorite(movie)}>
                        <svg width="43" height="43" viewBox="0 0 43 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M21.5 1.61804L26.076 15.7016L26.1883 16.0471H26.5516H41.3599L29.3797 24.7513L29.0858 24.9648L29.1981 25.3103L33.7741 39.3939L21.7939 30.6897L21.5 30.4762L21.2061 30.6897L9.22589 39.3939L13.8019 25.3103L13.9142 24.9648L13.6203 24.7513L1.64007 16.0471H16.4484H16.8117L16.924 15.7016L21.5 1.61804Z"
                                fill={isFavorite ? "#FFDA6E" : "#3C4733"} stroke="none"/>
                        </svg>
                    </button>
                </div>
                <p className="movie-description">{movie.overview}</p>
            </div>
        </div>
    );
}

export default MovieSearchResult;