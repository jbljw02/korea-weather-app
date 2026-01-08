import { apiClient } from '@shared/api/client';
import type { CurrentWeatherResponse, ForecastResponse } from '../model/types';

export const getCurrentWeather = async (
    lat: number,
    lon: number
): Promise<CurrentWeatherResponse> => {
    const response = await apiClient.get<CurrentWeatherResponse>('/data/2.5/weather', {
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
    const response = await apiClient.get<ForecastResponse>('/data/2.5/forecast', {
        params: {
            lat,
            lon,
        },
    });
    return response.data;
};
