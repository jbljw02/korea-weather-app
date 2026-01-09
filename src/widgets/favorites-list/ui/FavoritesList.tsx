import { WeatherCard } from '@entities/weather/ui/WeatherCard';
import { isEmptyArray } from '@shared/lib/type-guards';

interface FavoriteLocation {
    id: string;
    name: string;
    temperature: number;
    icon: string;
}

interface FavoritesListProps {
    favorites: FavoriteLocation[];
    onCardClick?: (id: string) => void;
}

const FavoritesListEmpty = () => {
    return (
        <div className="w-full flex-1 bg-white rounded-2xl shadow-sm p-8 flex items-center justify-center text-gray-500">
            <p>즐겨찾기된 지역이 없습니다.</p>
        </div>
    );
};

export const FavoritesList = ({ favorites, onCardClick }: FavoritesListProps) => {
    return (
        <div className="w-full flex-1 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">즐겨찾기</h2>
            {
                isEmptyArray(favorites) ? (
                    <FavoritesListEmpty />
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {favorites.map((favorite) => (
                            <WeatherCard
                                key={favorite.id}
                                location={favorite.name}
                                temperature={favorite.temperature}
                                icon={favorite.icon}
                                isFavorite={true}
                                onClick={() => onCardClick?.(favorite.id)}
                            />
                        ))}
                    </div>
                )
            }
        </div>
    );
};
