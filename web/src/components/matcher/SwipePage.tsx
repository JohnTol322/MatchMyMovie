import React, {useEffect} from "react";
import "./SwipePage.scss";
import {movieService} from "../../services/MovieService";
import {Movie} from "../../models/Movie";

const SwipePage = () => {

    const [movies, setMovies] = React.useState<Movie[]>([]);
    const [currentIndex, setCurrentIndex] = React.useState(0);

    useEffect(() => {

        if (movies.length > 0) {
            return;
        }

        movieService.discoverMovies()
            .then(setMovies)
            .catch(console.error);

    }, [setMovies]);

    return (
        <div className="swipe-page">
            <div className="swipe-box">
                {
                    movies[currentIndex] === undefined ? <div>Loading...</div> : <img className="movie-poster" src={`https://image.tmdb.org/t/p/w500/${movies[currentIndex]?.poster_path}`} alt={"profile"}/>
                }
                <div className="swipe-buttons">
                    <img onClick={() => setCurrentIndex(currentIndex+1)} src={require("../../assets/images/dislikeButton.png")} alt={"dislike"}/>
                    <img onClick={() => setCurrentIndex(currentIndex+1)} src={require("../../assets/images/likeButton.png")} alt={"dislike"}/>
                </div>
            </div>
        </div>
    );
}

export default SwipePage;