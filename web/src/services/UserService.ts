import {User} from "../models/User";
import {apiService} from "./ApiService";
import {HttpMethod} from "../models/api/HttpMethod";
import {ApiResponse} from "../models/api/ApiResponse";

class UserService {

    public createUser(user: User): Promise<ApiResponse<User>> {
        return new Promise((resolve, reject) => {
            apiService.call<User>('/api/user', HttpMethod.POST, JSON.stringify(user))
                .then((response) => {
                    resolve(response);
                }).catch(reject);
        });
    }

}

export const userService: UserService = new UserService();