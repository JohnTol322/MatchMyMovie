import React from "react";
import "./MovieDetailsOverlay.scss";
import {Movie, MovieDetails} from "../../../models/Movie";

interface MovieDetailsProps {
    showOverlay: boolean;
    movieDetails: MovieDetails | null;
    movieBase: Movie
    closeOverlay: () => void;
    animationDirection: "up" | "down" | null
}

const MovieDetailsOverlay: React.FC<MovieDetailsProps> = ({
                                                              showOverlay,
                                                              movieDetails,
                                                              movieBase,
                                                              closeOverlay,
                                                              animationDirection
                                                          }) => {

    const renderGenres = () => {
        if (!movieDetails) return;

        return movieDetails.genres.map((genre, index) => {
            return <span key={index}>{genre.name}{index < movieDetails.genres.length - 1 && " • "}</span>
        });
    }

    const renderRuntime = () => {
        if (!movieDetails) return;
        const hours: number = Math.floor(movieDetails.runtime / 60);
        const minutes: number = movieDetails.runtime % 60;

        return `${hours}h ${minutes}m`;
    }

    return (
        <div className={`overlay ${animationDirection} ${showOverlay && `animate-overlay`}`}>
            <img className="background-image"
                 src={`https://image.tmdb.org/t/p/original${movieBase?.backdrop_path}`}
                 alt=""
            />
            <div style={{margin: "36px", height: "90%"}}>
                <img src={require("../../../assets/images/closeIcon.png")}
                     className="close-icon"
                     onClick={closeOverlay}
                     alt="close"
                />
                <b className="title">{movieBase?.title} ({movieBase?.release_date.split("-")[0]})</b>
                <p className="tagline">{movieDetails?.tagline}</p>
                <hr/>
                <p className="overview">{movieBase?.overview}</p>
                <hr/>
                <p className="genres">{renderGenres()} - {renderRuntime()}</p>
            </div>
        </div>
    )
}

export default MovieDetailsOverlay;