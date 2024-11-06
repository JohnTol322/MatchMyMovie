import React, {useEffect} from "react";
import "./SwipePage.scss";
import {movieService} from "../../services/MovieService";
import {Movie} from "../../models/Movie";

const SwipePage = () => {

    const [movies, setMovies] = React.useState<Movie[]>([]);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [swipeRight, setSwipeRight] = React.useState(false);
    const [swipeLeft, setSwipeLeft] = React.useState(false);

    useEffect(() => {

        if (movies.length > 0) {
            return;
        }

        movieService.discoverMovies()
            .then(setMovies)
            .catch(console.error);

    }, [setMovies]);

    const currentStack = [
        movies[currentIndex],
        movies[currentIndex + 1],
        movies[currentIndex + 2]
    ];

    const handleSwipeRight = () => {
        if (swipeRight || swipeLeft) return;

        setSwipeRight(true);
        setTimeout(() => {
            setCurrentIndex(currentIndex + 1);
            setSwipeRight(false);
        }, 500);
    };

    const handleSwipeLeft = () => {
        if (swipeRight || swipeLeft) return;

        setSwipeLeft(true);
        setTimeout(() => {
            setCurrentIndex(currentIndex + 1);
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
                        <div className="movie-stack">
                            {
                                currentStack.map((movie, index) => (
                                    <img className={`movie-poster ${index === 0 ? swipeClass : ""}`}
                                         key={movie.id}
                                         style={{
                                             top: `${index * 8}px`,
                                             left: `${index * 8}px`,
                                             zIndex: currentStack.length - index
                                         }}
                                         src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    />
                                ))
                            }
                        </div>
                }
                <div className="swipe-buttons">
                    <img onClick={handleSwipeLeft}
                         src={require("../../assets/images/dislikeButton.png")} alt={"dislike"}/>
                    <img onClick={handleSwipeRight}
                         src={require("../../assets/images/likeButton.png")} alt={"dislike"}/>
                </div>
            </div>
        </div>
    );
}

export default SwipePage;