import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { SearchBar } from '@features/search-location/ui/SearchBar';
import { FavoritesList } from '@widgets/favorites-list/ui/FavoritesList';
import { CurrentWeatherWidget } from '@widgets/current-weather/ui/CurrentWeatherWidget';
import { useFavorites } from '@features/toggle-favorite/model/useFavorites';
import { getCoordinatesWithFallback } from '@entities/location/lib/getCoordinatesWithFallback';

export const MainPage = () => {
    const navigate = useNavigate();
    const { favoritesSet, favorites, handleToggleFavorite, handleUpdateDisplayName } = useFavorites();

    const handleSelectSuggestion = async (suggestion: { fullName: string; displayName: string }) => {
        try {
            const locations = await getCoordinatesWithFallback(suggestion.fullName);
            if (locations) {
                const id = suggestion.fullName;
                navigate(`/detail/${id}?lat=${locations.lat}&lon=${locations.lon}`);
            } else {
                toast.error('해당 장소의 정보가 제공되지 않습니다.');
            }
        } catch (error) {
            toast.error('장소 정보를 가져오는 중 오류가 발생했습니다.');
        }
    };

    const handleFavoriteClick = (id: string) => {
        const favorite = favorites.find((fav) => fav.id === id);
        if (favorite && favorite.lat && favorite.lon) {
            navigate(`/detail/${id}?lat=${favorite.lat}&lon=${favorite.lon}`);
        } else {
            navigate(`/detail/${id}`);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gray-50 px-4 py-6 md:px-8 md:py-8 flex flex-col">
            <div className="max-w-7xl mx-auto w-full flex flex-col">
                <SearchBar
                    onSelectSuggestion={handleSelectSuggestion}
                    favorites={favoritesSet}
                    onToggleFavorite={handleToggleFavorite}
                />
                <div className="mb-8 md:mb-12">
                    <CurrentWeatherWidget />
                </div>
                <div className="flex-1 flex flex-col">
                    <FavoritesList
                        favorites={favorites}
                        onCardClick={handleFavoriteClick}
                        onToggleFavorite={handleToggleFavorite}
                        onUpdateDisplayName={handleUpdateDisplayName}
                    />
                </div>
            </div>
        </div>
    );
};
