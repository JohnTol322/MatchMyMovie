import {HttpMethod} from "../models/api/HttpMethod";
import Swipe from "../models/Swipe";
import {apiService} from "./ApiService";
import AuthError from "../models/errors/AuthError";

class SwipeService {

    public saveSwipe(swipe: Swipe): Promise<Swipe> {
        return new Promise((resolve, reject) => {
            apiService.call<Swipe>('/api/swipe', HttpMethod.POST, true, JSON.stringify(swipe)).then((response) => {
                if (response.status === 403 || response.status === 401) {
                    return reject(new AuthError("You are not authorized to view this content"));
                } else if (![200, 201].includes(response.status)) {
                    return reject(response.message);
                }

                return resolve(response.data);
            }).catch(reject);
        });
    }
}

export const swipeService: SwipeService = new SwipeService();