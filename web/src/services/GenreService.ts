import {Genre} from "../models/Movie";
import {apiService} from "./ApiService";
import {HttpMethod} from "../models/api/HttpMethod";
import AuthError from "../models/errors/AuthError";

class GenreService {
    public async getAllGenres(): Promise<Genre[]> {
        return new Promise((resolve, reject) => {
            apiService.call<Genre[]>('/api/genres', HttpMethod.GET, true).then((response) => {
                if (response.status === 403 || response.status === 401) {
                    return reject(new AuthError("You are not authorized to view this content"));
                } else if (response.status !== 200) {
                    return reject(response.message);
                }

                return resolve(response.data);
            });
        });
    }
}

export const genreService: GenreService = new GenreService();