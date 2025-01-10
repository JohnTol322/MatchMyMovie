import React, {useEffect, useState} from "react";
import "./FavoriteGenreList.scss";
import {genreService} from "../../../services/GenreService";
import AuthError from "../../../models/errors/AuthError";
import {useNavigate} from "react-router-dom";
import {Genre} from "../../../models/Movie";

interface FavoriteGenreListProps {
    favoriteGenres: Genre[];
    setFavoriteGenres: (genres: Genre[]) => void;
}

const FavoriteGenreList: React.FC<FavoriteGenreListProps> = ({
                                                                 favoriteGenres,
                                                                 setFavoriteGenres
                                                             }) => {

    const [genres, setGenres] = useState<Genre[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        genreService.getAllGenres().then((genres) => {
            setGenres(genres);
        }).catch((error) => {
            if (error instanceof AuthError) {
                navigate("/login");
            } else {
                console.error(error);
            }
        });
    }, [navigate]);

    const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>, genre: Genre) => {
        const genreName = event.target.name;
        const isChecked = event.target.checked;

        if (isChecked) {
            setFavoriteGenres([...favoriteGenres, genre]);
        } else {
            setFavoriteGenres(favoriteGenres.filter((genre) => genre.name !== genreName));
        }
    }

        return (
            <div>
                <div className="checkbox-container">
                    {genres.map((genre) => (
                        <div key={genre.id} className="genre-item">
                            <input type="checkbox" id={genre.name} name={genre.name} onChange={(e) => handleGenreChange(e, genre)}/>
                            <label htmlFor={genre.name}>{genre.name}</label>
                        </div>
                    ))}
                </div>
            </div>
        );
    }


    export default FavoriteGenreList;