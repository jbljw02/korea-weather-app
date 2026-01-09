import { isNil, isNotNil } from "@shared/lib/type-guards";
import { useQuery } from "@tanstack/react-query";
import { getLocationByCoordinates } from "../api";

const UNKNOWN_LOCATION_NAME = '알 수 없는 위치';

export const useLocationName = (lat: number | null, lon: number | null) => {
    return useQuery({
        queryKey: ['locationName', lat, lon],
        queryFn: () => {
            if (isNil(lat) || isNil(lon)) {
                throw new Error('Coordinates are required');
            }
            return getLocationByCoordinates(lat, lon, 1);
        },
        select: (data) => {
            const location = data[0];
            if (isNil(location)) {
                return UNKNOWN_LOCATION_NAME;
            }
            const locationName = location.local_names?.ko ?? location.name;
            return locationName;
        },
        enabled: isNotNil(lat) && isNotNil(lon),
        retry: 3,
        throwOnError: false,
    });
};