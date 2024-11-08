import {HttpMethod} from "../models/api/HttpMethod";
import {ApiResponse} from "../models/api/ApiResponse";
import AuthService from "./AuthService";

class ApiService {
    static apiUrl: string = "http://localhost:8080";
    public call<T>(path: string, method: HttpMethod = HttpMethod.GET, secure: boolean = false, body: string | null = null, formData: FormData | null = null): Promise<ApiResponse<T>> {
        return new Promise((resolve, reject) => {
            const requestMethod: string = HttpMethod[method];
            const requestOptions: RequestInit = {
                method: requestMethod,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                }
            };

            if (secure) {
                requestOptions.headers = {
                    ...requestOptions.headers,
                    "Authorization": `Bearer ${localStorage.getItem(AuthService.tokenKey)}`
                }
            }

            if (body) {
                requestOptions.body = body;
            } else if (formData) {
                requestOptions.body = formData;
            }

            fetch(`${ApiService.apiUrl}${path}`, requestOptions)
                .then(response => response.json())
                .then(jsonResponse => {
                    if (!jsonResponse) {
                        reject(new Error('Could not parse the api call response'));
                    }

                    resolve(jsonResponse);
                }).then(reject);
        });
    }
}

export const apiService: ApiService = new ApiService();