import WatchProvider from "../models/WatchProvider";
import {apiService} from "./ApiService";
import AuthError from "../models/errors/AuthError";
import {HttpMethod} from "../models/api/HttpMethod";

class WatchProviderService {
    public async getWatchProviders(): Promise<WatchProvider[]> {
        return new Promise((resolve, reject) => {
            apiService.call<WatchProvider[]>('/api/watch-providers?maxPriorityScore=60', HttpMethod.GET, true).then((response) => {
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

export const watchProviderService: WatchProviderService = new WatchProviderService();