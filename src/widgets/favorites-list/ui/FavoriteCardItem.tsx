import { WeatherCard } from '@entities/weather/ui/WeatherCard';
import { WeatherCardLoading } from '@entities/weather/ui/WeatherCardLoading';
import { isNil } from '@shared/lib/type-guards';
import type { FavoriteLocation } from '@entities/favorite';
import type { DistrictSuggestion } from '@entities/district';
import { FavoriteCardError } from './FavoriteCardError';

interface FavoriteCardItemProps {
    favorite: FavoriteLocation;
    onCardClick: (id: string) => void;
    onToggleFavorite: (item: DistrictSuggestion) => void;
}

export const FavoriteCardItem = ({ favorite, onCardClick, onToggleFavorite }: FavoriteCardItemProps) => {
    return (
        <div className="min-w-0 min-h-[170px]">
            {favorite.isLoading ? (
                <WeatherCardLoading />
            ) : isNil(favorite.lat) || isNil(favorite.lon) ? (
                <FavoriteCardError displayName={favorite.displayName} />
            ) : (
                <WeatherCard
                    location={favorite.displayName}
                    temperature={favorite.temperature}
                    icon={favorite.icon}
                    isFavorite={true}
                    fullName={favorite.fullName}
                    onClick={() => onCardClick(favorite.id)}
                    onToggleFavorite={onToggleFavorite}
                />
            )}
        </div>
    );
};
