import type { FavoriteItem } from '../model/types';

const FAVORITES_STORAGE_KEY = 'weather-app-favorites';

// Set으로 존재 여부 확인 전용
export const getFavorites = (): Set<string> => {
    try {
        const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (!stored) {
            return new Set();
        }
        const favorites: FavoriteItem[] = JSON.parse(stored);
        return new Set(favorites.map((item) => item.fullName));
    } catch {
        return new Set();
    }
};

// 전체 즐겨찾기 목록 조회 전용
export const getFavoriteItems = (): FavoriteItem[] => {
    try {
        const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (!stored) {
            return [];
        }
        return JSON.parse(stored);
    } catch {
        return [];
    }
};

export const toggleFavorite = (item: FavoriteItem): boolean => {
    try {
        const favorites = getFavoriteItems();
        const exists = favorites.some((fav) => fav.fullName === item.fullName);
        if (exists) {
            const filtered = favorites.filter((fav) => fav.fullName !== item.fullName);
            localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(filtered));
            return false;
        }

        favorites.push(item);
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
        return true;
    } catch {
        return false;
    }
};
