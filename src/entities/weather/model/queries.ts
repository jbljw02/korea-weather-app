import { useQuery } from '@tanstack/react-query';
import { getCurrentWeather, getForecast } from '../api/getWeather';
import { isNil, isNotNil } from '@shared/lib/type-guards';

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
