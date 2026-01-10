import { useState, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import {
    getFavorites,
    getFavoriteItems,
    toggleFavorite as toggleFavoriteStorage,
    updateFavoriteDisplayName,
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
            const query = weatherQueries[index];
            const weatherData = query?.data;
            const isLoading = query?.isLoading ?? false;
            const storedItem = getFavoriteItems().find((fav) => fav.fullName === item.fullName);
            const lat = storedItem?.lat;
            const lon = storedItem?.lon;

            if (isNil(weatherData)) {
                return {
                    id: item.id,
                    displayName: item.displayName,
                    fullName: item.fullName,
                    lat,
                    lon,
                    isLoading,
                };
            }

            const temperature = Math.round(weatherData.main.temp);
            const minTemp = Math.round(weatherData.main.temp_min);
            const maxTemp = Math.round(weatherData.main.temp_max);
            const icon = weatherData.weather[0]?.icon ?? '02d';
            return {
                id: item.id,
                displayName: item.displayName,
                fullName: item.fullName,
                temperature,
                minTemp,
                maxTemp,
                icon,
                lat,
                lon,
                isLoading,
            };
        });
    }, [favoriteItems, weatherQueries]);

    const handleToggleFavorite = useCallback(async (param: DistrictSuggestion) => {
        const currentSet = getFavorites();
        const isRemoving = currentSet.has(param.fullName);

        if (isRemoving) {
            const existingItem = getFavoriteItems().find((item) => item.fullName === param.fullName);
            if (existingItem) {
                toggleFavoriteStorage(existingItem);
            }
        } else {
            const currentItems = getFavoriteItems();
            if (currentItems.length >= 6) {
                toast.error('즐겨찾기는 최대 6개까지 추가할 수 있습니다.');
                return;
            }

            const coordinates = await getCoordinatesWithFallback(param.fullName);
            const lat = coordinates?.lat;
            const lon = coordinates?.lon;

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
    }, []);

    const handleUpdateDisplayName = useCallback((fullName: string, newDisplayName: string) => {
        if (updateFavoriteDisplayName(fullName, newDisplayName)) {
            setFavoriteItems(getFavoriteItems());
            toast.success('장소의 이름이 변경되었습니다.');
        } else {
            toast.error('장소 이름 변경에 실패했습니다.');
        }
    }, []);

    return {
        favoritesSet,
        favorites,
        handleToggleFavorite,
        handleUpdateDisplayName,
    };
};