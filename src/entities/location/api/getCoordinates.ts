import { apiClient } from '@shared/api/client';
import type { GeocodingLocation } from '../model/types';

export const getCoordinatesByLocationName = async (
    locationName: string,
    limit: number = 10
): Promise<GeocodingLocation[]> => {
    const response = await apiClient.get<GeocodingLocation[]>('/geo/1.0/direct', {
        params: {
            q: locationName,
            limit,
        },
    });
    return response.data;
};

export const getLocationByCoordinates = async (
    lat: number,
    lon: number,
    limit: number = 10
): Promise<GeocodingLocation[]> => {
    const response = await apiClient.get<GeocodingLocation[]>('/geo/1.0/reverse', {
        params: {
            lat,
            lon,
            limit,
        },
    });
    return response.data;
};
