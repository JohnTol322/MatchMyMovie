import React from "react";
import "./MovieSearchResult.scss";
import {Movie} from "../../../../models/Movie";

interface MovieSearchResultProps {
    movie: Movie;
}

const MovieSearchResult: React.FC<MovieSearchResultProps> = ({movie}) => {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    };

    return (
        <div className="movie-result">
            <div className="movie-poster">
                <img className="movie-poster" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="Movie Poster"/>
            </div>
            <div className="movie-info">
                <div>
                    <b className="movie-title">{movie.title}</b>
                    <p className="release-date">{formatDate(movie.release_date)}</p>
                </div>
                <p className="movie-description">{movie.overview}</p>
            </div>
        </div>
    );
}

export default MovieSearchResult;