import { useState, useCallback, useMemo } from 'react';
import {
    getFavorites,
    getFavoriteItems,
    toggleFavorite as toggleFavoriteStorage,
    type FavoriteItem,
    type FavoriteLocation
} from '@entities/favorite';
import { useFavoriteWeathers } from '@entities/weather';
import { getCoordinatesWithFallback } from '@entities/location/lib/getCoordinatesWithFallback';
import { isNil } from '@shared/lib/type-guards';
import type { DistrictSuggestion } from '@entities/district';

export const useFavorites = () => {
    const [favoritesSet, setFavoritesSet] = useState<Set<string>>(() => getFavorites());
    const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>(() => getFavoriteItems());

    const weatherQueries = useFavoriteWeathers(favoriteItems);

    const favorites = useMemo<FavoriteLocation[]>(() => {
        return favoriteItems.map((item, index) => {
            const weatherData = weatherQueries[index].data;
            const storedItem = getFavoriteItems().find((fav) => fav.fullName === item.fullName);
            const lat = storedItem?.lat ?? 0;
            const lon = storedItem?.lon ?? 0;

            if (isNil(weatherData)) {
                return {
                    id: item.id,
                    displayName: item.displayName,
                    fullName: item.fullName,
                    lat,
                    lon,
                };
            }

            const temperature = Math.round(weatherData.main.temp);
            const icon = weatherData.weather[0]?.icon ?? '02d';
            return {
                id: item.id,
                displayName: item.displayName,
                fullName: item.fullName,
                temperature,
                icon,
                lat,
                lon,
            };
        });
    }, [favoriteItems, weatherQueries]);

    // useCallback: SearchBar의 불필요한 재렌더링 방지
    const handleToggleFavorite = useCallback(async (param: DistrictSuggestion) => {
        const isRemoving = favoritesSet.has(param.fullName);

        if (isRemoving) {
            const existingItem = getFavoriteItems().find((item) => item.fullName === param.fullName);
            if (existingItem) {
                toggleFavoriteStorage(existingItem);
            }
        } else {
            const coordinates = await getCoordinatesWithFallback(param.fullName);
            const lat = coordinates?.lat ?? 0;
            const lon = coordinates?.lon ?? 0;

            toggleFavoriteStorage({
                id: param.fullName,
                fullName: param.fullName,
                displayName: param.displayName,
                lat,
                lon,
            });

        }
        setFavoritesSet((prevSet) => {
            const newSet = new Set(prevSet);
            if (newSet.has(param.fullName)) {
                newSet.delete(param.fullName);
            } else {
                newSet.add(param.fullName);
            }
            return newSet;
        });

        setFavoriteItems(getFavoriteItems());
    }, [favoritesSet]);

    return {
        favoritesSet,
        favorites,
        handleToggleFavorite,
    };
};