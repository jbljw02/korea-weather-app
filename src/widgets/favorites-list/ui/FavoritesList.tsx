import { isEmptyArray } from '@shared/lib/type-guards';
import type { FavoriteLocation } from '@entities/favorite';
import type { DistrictSuggestion } from '@entities/district';
import { FavoriteCardItem } from './FavoriteCardItem';

interface FavoritesListProps {
    favorites: FavoriteLocation[];
    onCardClick: (id: string) => void;
    onToggleFavorite: (item: DistrictSuggestion) => void;
    onUpdateDisplayName?: (fullName: string, newDisplayName: string) => void;
}

const FavoritesListEmpty = () => {
    return (
        <div className="w-full flex-1 bg-white rounded-2xl shadow-sm p-8 flex items-center justify-center text-gray-500">
            <p>즐겨찾기된 지역이 없습니다.</p>
        </div>
    );
};

export const FavoritesList = ({ favorites, onCardClick, onToggleFavorite, onUpdateDisplayName }: FavoritesListProps) => {
    return (
        <div className="w-full flex-1 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">즐겨찾기</h2>
            {
                isEmptyArray(favorites) ? (
                    <FavoritesListEmpty />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
                        {favorites.map((favorite) => (
                            <FavoriteCardItem
                                key={favorite.id}
                                favorite={favorite}
                                onCardClick={onCardClick}
                                onToggleFavorite={onToggleFavorite}
                                onUpdateDisplayName={onUpdateDisplayName}
                            />
                        ))}
                    </div>
                )
            }
        </div>
    );
};
