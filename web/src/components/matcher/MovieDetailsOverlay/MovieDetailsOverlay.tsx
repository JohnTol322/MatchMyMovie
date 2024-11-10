import React from "react";
import "./MovieDetailsOverlay.scss";
import {MovieDetails} from "../../../models/Movie";

interface MovieDetailsProps {
    showOverlay: boolean;
    movie: MovieDetails | null;
    closeOverlay: () => void;
}

const MovieDetailsOverlay: React.FC<MovieDetailsProps> = ({
                                                              showOverlay,
                                                              movie,
                                                              closeOverlay
                                                          }) => {

    return (
        <div className={`overlay ${showOverlay && "overlay-animation"}`}>
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