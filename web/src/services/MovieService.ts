import {Movie} from "../models/Movie";
import {apiService} from "./ApiService";
import {HttpMethod} from "../models/api/HttpMethod";

class MovieService {

    public discoverMovies(): Promise<Movie[]> {
        return new Promise<Movie[]>((resolve, reject) => {
            apiService.call<Movie[]>("/api/movies", HttpMethod.GET).then((response) => {
                if (response.status !== 200) {
                    return reject(response.message);
                }

                return resolve(response.data);
            });
        });
    }
}

export const movieService: MovieService = new MovieService();