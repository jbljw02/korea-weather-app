import { apiClient } from '@shared/api/client';
import type { CurrentWeatherResponse, ForecastResponse } from '../model/types';

export const getCurrentWeather = async (
    lat: number,
    lon: number
): Promise<CurrentWeatherResponse> => {
    const response = await apiClient.get<CurrentWeatherResponse>('/weather', {
        params: {
            lat,
            lon,
        },
    });
    return response.data;
};

export const getForecast = async (
    lat: number,
    lon: number
): Promise<ForecastResponse> => {
    const response = await apiClient.get<ForecastResponse>('/forecast', {
        params: {
            lat,
            lon,
        },
    });
    return response.data;
};
