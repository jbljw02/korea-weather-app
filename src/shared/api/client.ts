import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { handleApiError } from './errors';

const DEFAULT_TIMEOUT = 5000;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        config.params = {
            ...config.params,
            appid: API_KEY,
            units: 'metric',
            lang: 'kr',
        };
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        const handledError = handleApiError(error);
        return Promise.reject(handledError);
    }
);