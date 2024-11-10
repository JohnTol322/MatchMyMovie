import React from "react";
import "./MovieDetailsOverlay.scss";
import {MovieDetails} from "../../../models/Movie";

interface MovieDetailsProps {
    showOverlay: boolean;
    movie: MovieDetails | null;
}

const MovieDetailsOverlay: React.FC<MovieDetailsProps> = ({
                                                              showOverlay,
                                                              movie
                                                          }) => {

    return (
        <div className={`overlay ${showOverlay && "overlay-animation"}`}>
            <div style={{margin: "36px"}}>
                <b className="title">{movie?.title}</b>
                <p className="tagline">{movie?.tagline}</p>

                <hr/>
                <p className="overview">{movie?.overview}</p>
            </div>
        </div>
    );
}

export default MovieDetailsOverlay;