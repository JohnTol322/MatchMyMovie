import React, {useEffect} from "react";
import "./MovieSearch.scss";
import MovieSearchResult from "./MovieSearchResult/MovieSearchResult";
import {movieService} from "../../../services/MovieService";
import {Movie} from "../../../models/Movie";

interface MovieSearchProps {
    setFavoriteMovie: (movie: Movie) => void;
    favoriteMovie?: Movie;
}

const MovieSearch: React.FC<MovieSearchProps> = ({
                                                     setFavoriteMovie,
                                                     favoriteMovie
                                                 }) => {

    const [searchResults, setSearchResults] = React.useState<Movie[]>([]);
    const [searchTerm, setSearchTerm] = React.useState<string>("");

    const handleSearch = () => {
        movieService.searchMovies(searchTerm).then((movies) => {
            setSearchResults(movies);
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        if (searchTerm === "") {
            setSearchResults([]);
        }
    }, [searchTerm]);

    return (
        <div className="movie-search-container">
            <div className="searchbar">
                <input onChange={(e) => setSearchTerm(e.target.value)}
                       className="search-box"
                       type="text"
                       placeholder="Search for a movie"/>

                <button onClick={handleSearch} className="search-btn">
                    <img src={require("../../../assets/images/icons/search.png")} alt="Search Icon"/>
                </button>
            </div>
            <div className="movie-search-results">
                {searchResults.map((movie) => (
                    <MovieSearchResult isFavorite={favoriteMovie === movie} setFavorite={setFavoriteMovie}
                                       key={movie.id} movie={movie}/>
                ))}
            </div>
        </div>
    );
}

export default MovieSearch;