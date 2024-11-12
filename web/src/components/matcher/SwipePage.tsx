import React, {useEffect} from "react";
import "./SwipePage.scss";
import {movieService} from "../../services/MovieService";
import {Movie, MovieDetails} from "../../models/Movie";
import AuthError from "../../models/errors/AuthError";
import {useNavigate} from "react-router-dom";
import {swipeService} from "../../services/SwipeService";
import MovieStack from "./MovieStack/MovieStack";
import SwipeButtonSet from "./SwipeButtonSet/SwipeButtonSet";
import MovieDetailsOverlay from "./MovieDetailsOverlay/MovieDetailsOverlay";

const SwipePage = () => {

    const [movies, setMovies] = React.useState<Movie[]>([]);
    const [movieDetails, setMovieDetails] = React.useState<MovieDetails | null>(null);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [swipeRight, setSwipeRight] = React.useState(false);
    const [swipeLeft, setSwipeLeft] = React.useState(false);
    const [showInfo, setShowInfo] = React.useState(false);
    const [overlayAnimation, setOverlayAnimation] = React.useState<"up" | "down" | null>(null);

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

    }, [setMovies, movies.length, navigate]);

    const currentStack = [
        movies[currentIndex],
        movies[currentIndex + 1],
        movies[currentIndex + 2]
    ];

    const handleSwipe = (liked: boolean) => {
        if (swipeRight || swipeLeft) return;
        setMovieDetails(null);

        const movie = movies[currentIndex];

        swipeService.saveSwipe({movieId: movie.id, liked, genreIds: movie.genre_ids})
            .catch((error) => {
                if (error instanceof AuthError) {
                    return navigate("/login");
                } else {
                    console.error(error);
                }
            });

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

    const handleMovieDetails = () => {
        setOverlayAnimation("up");
        setShowInfo(true);

        if (movieDetails?.id === movies[currentIndex].id) {
            return;
        }

        movieService.getMovieDetails(movies[currentIndex].id)
            .then(setMovieDetails)
            .catch((error) => {
                if (error instanceof AuthError) {
                    return navigate("/login");
                } else {
                    console.error(error);
                }
            });

    }

    const closeOverlay = () => {
        setOverlayAnimation("down");
        setTimeout(() => {
            setShowInfo(false);
        }, 600);
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
                                onSwipeRight={() => handleSwipe(true)}
                                onInfoClick={handleMovieDetails}
                />

                <MovieDetailsOverlay showOverlay={showInfo}
                                     movieDetails={movieDetails}
                                     movieBase={movies[currentIndex]}
                                     closeOverlay={closeOverlay}
                                     animationDirection={overlayAnimation}
                />
            </div>
        </div>
    );
}

export default SwipePage;