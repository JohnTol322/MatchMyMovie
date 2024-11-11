import {Movie, MovieDetails} from "../models/Movie";
import {apiService} from "./ApiService";
import {HttpMethod} from "../models/api/HttpMethod";
import AuthError from "../models/errors/AuthError";

class MovieService {

    public discoverMovies(): Promise<Movie[]> {
        return new Promise<Movie[]>((resolve, reject) => {
            apiService.call<Movie[]>("/api/movies", HttpMethod.GET, true).then((response) => {
                if (response.status === 403 || response.status === 401) {
                    return reject(new AuthError("You are not authorized to view this content"));
                } else if (response.status !== 200) {
                    return reject(response.message);
                }

                return resolve(response.data);
            }).catch(reject);
        });
    }

    public getMovieDetails(movieId: number): Promise<MovieDetails> {
        return new Promise((resolve, reject) => {
            apiService.call<MovieDetails>(`/api/movies/${movieId}/details`, HttpMethod.GET, true).then((response) => {
                if (response.status === 403 || response.status === 401) {
                    return reject(new AuthError("You are not authorized to view this content"));
                } else if (response.status !== 200) {
                    return reject(response.message);
                }

                return resolve(response.data);
            }).catch(reject);
        });
    }
}

export const movieService: MovieService = new MovieService();