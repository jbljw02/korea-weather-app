export interface FavoriteItem {
    id: string;
    fullName: string;
    displayName: string;
    lat?: number;
    lon?: number;
}

export interface FavoriteLocation extends FavoriteItem {
    temperature?: number;
    icon?: string;
    isLoading?: boolean;
}
