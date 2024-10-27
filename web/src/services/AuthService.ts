import {apiService} from "./ApiService";
import {HttpMethod} from "../models/api/HttpMethod";
import {LoginDetails} from "../models/LoginDetails";

class AuthService {
    public static tokenKey: string = 'auth-token';

    public login(loginDetails: LoginDetails): Promise<boolean> {
        return new Promise((resolve, reject) => {
            apiService.call<string>('/api/authenticate', HttpMethod.POST, JSON.stringify(loginDetails))
                .then(response => {
                    if (response.status === 200) {
                        localStorage.setItem(AuthService.tokenKey, response.data);
                        resolve(true);
                    }
                    resolve(false);
                });
        });
    }
}

export const authService: AuthService = new AuthService();