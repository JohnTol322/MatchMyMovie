import Onboarding from "../models/Onboarding";
import {apiService} from "./ApiService";
import {HttpMethod} from "../models/api/HttpMethod";
import AuthError from "../models/errors/AuthError";

class OnboardingService {

    public async addOnboardingToUser(onboarding: Onboarding): Promise<any> {
        return new Promise((resolve, reject) => {
            apiService.call('/api/onboarding', HttpMethod.POST, true, JSON.stringify(onboarding)).then((response) => {
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

export const onboardingService: OnboardingService = new OnboardingService();