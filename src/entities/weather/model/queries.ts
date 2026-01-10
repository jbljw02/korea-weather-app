import { useQuery, useQueries } from '@tanstack/react-query';
import { getCurrentWeather, getForecast } from '../api/getWeather';
import { isEmptyArray, isNil, isNotNil } from '@shared/lib/type-guards';
import { getCoordinatesByLocationName } from '@entities/location/api';
import type { FavoriteItem } from '@shared/lib/localStorage';

export const useCurrentWeather = (lat: number | null, lon: number | null) => {
    return useQuery({
        queryKey: ['currentWeather', lat, lon],
        queryFn: () => {
            if (isNil(lat) || isNil(lon)) {
                throw new Error('Coordinates are required');
            }
            return getCurrentWeather(lat, lon);
        },
        enabled: isNotNil(lat) && isNotNil(lon),
        retry: 3,
        throwOnError: false,
    });
};

export const useForecast = (lat: number | null, lon: number | null) => {
    return useQuery({
        queryKey: ['forecast', lat, lon],
        queryFn: () => {
            if (isNil(lat) || isNil(lon)) {
                throw new Error('Coordinates are required');
            }
            return getForecast(lat, lon);
        },
        enabled: isNotNil(lat) && isNotNil(lon),
        retry: 3,
        throwOnError: false,
    });
};

export const useFavoriteWeathers = (favoriteItems: FavoriteItem[]) => {
    return useQueries({
        queries: favoriteItems.map((item) => ({
            queryKey: ['favoriteWeather', item.fullName] as const,
            queryFn: async () => {
                const coordinates = await getCoordinatesByLocationName(item.displayName, 1);
                if (isEmptyArray(coordinates)) {
                    return null;
                }

                const { lat, lon } = coordinates[0];
                if (isNil(lat) || isNil(lon)) {
                    return null;
                }

                return getCurrentWeather(lat, lon);
            },
            enabled: favoriteItems.length > 0,
            retry: 3,
            throwOnError: false,
        })),
    });
};
