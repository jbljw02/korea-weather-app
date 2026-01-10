import { useState, useEffect } from 'react';
import { getFavoriteItems } from '../lib/storage';
import { getCoordinatesWithFallback } from '@entities/location/lib/getCoordinatesWithFallback';
import { isNotNil } from '@shared/lib/type-guards';

export const useFavoriteCoordinates = (id: string, initialLat: number | null, initialLon: number | null) => {
    const [coordinates, setCoordinates] = useState(
        isNotNil(initialLat) && isNotNil(initialLon) ?
            { lat: initialLat, lon: initialLon } :
            null
    );

    useEffect(() => {
        const fetchCoordinates = async () => {
            if (initialLat && initialLon) {
                return;
            }

            const favoriteItems = getFavoriteItems();
            const favoriteItem = favoriteItems.find((item) => item.id === id || item.fullName === id);

            if (favoriteItem) {
                if (isNotNil(favoriteItem.lat) && isNotNil(favoriteItem.lon) && favoriteItem.lat !== 0 && favoriteItem.lon !== 0) {
                    setCoordinates({ lat: favoriteItem.lat, lon: favoriteItem.lon });
                    return;
                }

                const coords = await getCoordinatesWithFallback(favoriteItem.fullName);
                if (coords) {
                    setCoordinates(coords);
                }
            }
        };

        fetchCoordinates();
    }, [id, initialLat, initialLon]);

    return coordinates;
};
