import React, {useEffect} from "react";
import "./SwipePage.scss";
import {movieService} from "../../services/MovieService";
import {Movie} from "../../models/Movie";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import AuthError from "../../models/errors/AuthError";
import {redirect, useNavigate} from "react-router-dom";
import {swipeService} from "../../services/SwipeService";
import MovieStack from "./MovieStack/MovieStack";
import SwipeButtonSet from "./SwipeButtonSet/SwipeButtonSet";

const SwipePage = () => {

    const [movies, setMovies] = React.useState<Movie[]>([]);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [swipeRight, setSwipeRight] = React.useState(false);
    const [swipeLeft, setSwipeLeft] = React.useState(false);

    const navigate = useNavigate();

    useEffect(() => {

        if (movies.length > 0) {
            return;
        }

        movieService.discoverMovies()
            .then(setMovies)
            .catch((error) => {
                if (error instanceof AuthError) {
                    return navigate("/login");
                } else {
                    console.error(error);
                }
            });

    }, [setMovies]);

    const currentStack = [
        movies[currentIndex],
        movies[currentIndex + 1],
        movies[currentIndex + 2]
    ];

    const handleSwipe = (liked: boolean) => {
        if (swipeRight || swipeLeft) return;

        const movie = movies[currentIndex];

        swipeService.saveSwipe({movieId: movie.id, liked})
            .catch(console.error);

        if (liked) {
            setSwipeRight(true);
        } else {
            setSwipeLeft(true);
        }

        setTimeout(() => {
            setCurrentIndex(currentIndex + 1);
            setSwipeRight(false);
            setSwipeLeft(false);
        }, 500);
    }

    const swipeClass: string = swipeRight ? "likeSwipe" : swipeLeft ? "dislikeSwipe" : "";

    return (
        <div className="swipe-page">
            <div className="swipe-box">
                {
                    movies[currentIndex] === undefined ?
                        <div>Loading...</div> :
                        <MovieStack swipeClass={swipeClass}
                                    stack={currentStack}/>
                }

                <SwipeButtonSet onSwipeLeft={() => handleSwipe(false)}
                                onSwipeRight={() => handleSwipe(true)}/>
            </div>
        </div>
    );
}

export default SwipePage;