import React from "react";
import "./MovieDetailsOverlay.scss";
import {MovieDetails} from "../../../models/Movie";

interface MovieDetailsProps {
    showOverlay: boolean;
    movie: MovieDetails | null;
    closeOverlay: () => void;
    animation: "up" | "down" | null
}

const MovieDetailsOverlay: React.FC<MovieDetailsProps> = ({
                                                              showOverlay,
                                                              movie,
                                                              closeOverlay,
                                                              animation
                                                          }) => {

    return (
        <div className={`overlay ${animation ?? animation} ${showOverlay && `animate-overlay`}`}>
            <div style={{margin: "36px"}}>
                <img src={require("../../../assets/images/closeIcon.png")}
                     className="close-icon"
                     onClick={closeOverlay}
                />
                <b className="title">{movie?.title} ({movie?.release_date.split("-")[0]})</b>
                <p className="tagline">{movie?.tagline}</p>
                <hr/>
                <p className="overview">{movie?.overview}</p>
            </div>
        </div>
    );
}

export default MovieDetailsOverlay;