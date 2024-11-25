import React from "react";
import "./MovieStack.scss";
import {Movie} from "../../../models/Movie";

interface MovieStackProps {
    swipeClass: string;
    stack: Movie[];
}

const MovieStack: React.FC<MovieStackProps> = ({
                                                   swipeClass,
                                                   stack
                                               }) => {

    return (
        <div className="movie-stack">
            {
                stack.map((movie, index) => (
                    <img className={`movie-poster ${index === 0 ? swipeClass : ""}`}
                         key={movie.id}
                         style={{
                             top: `${index * 8}px`,
                             left: `${index * 8}px`,
                             zIndex: stack.length - index
                         }}
                         src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                         alt={movie.title}
                    />
                ))
            }
        </div>
    );
}

export default MovieStack;