import {User} from "../models/User";
import {apiService} from "./ApiService";
import {HttpMethod} from "../models/api/HttpMethod";
import {ApiResponse} from "../models/api/ApiResponse";
import AuthError from "../models/errors/AuthError";

class UserService {

    public createUser(user: User): Promise<ApiResponse<User>> {
        return new Promise((resolve, reject) => {
            apiService.call<User>('/api/user', HttpMethod.POST, false, JSON.stringify(user))
                .then((response) => {
                    resolve(response);
                }).catch(reject);
        });
    }

    public getAuthenticatedUser(): Promise<User> {
        return new Promise((resolve, reject) => {
            apiService.call<User>('/api/user/me', HttpMethod.GET, true).then((response) => {
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

export const userService: UserService = new UserService();