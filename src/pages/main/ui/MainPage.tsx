import { SearchBar } from '@features/search-location/ui/SearchBar';
import { FavoritesList } from '@widgets/favorites-list/ui/FavoritesList';
import { CurrentWeatherWidget } from '@widgets/current-weather/ui/CurrentWeatherWidget';

// FIXME: 즐겨찾기 mock data, 삭제 예정
const favorites = [
    { id: '1', name: '종로구, 서울', temperature: 20, icon: '02d' },
    { id: '2', name: '강남구, 서울', temperature: 20, icon: '02d' },
    { id: '3', name: '송파구, 서울', temperature: 20, icon: '02d' },
    { id: '4', name: '마포구, 서울', temperature: 28, icon: '01d' },
    { id: '5', name: '서초구, 서울', temperature: 20, icon: '02d' },
    { id: '6', name: '영등포구, 서울', temperature: 20, icon: '02d' },
];

export const MainPage = () => {

    const handleSearch = (query: string) => {
        // TODO: 검색 로직 구현
    };

    const handleSelectSuggestion = (suggestion: { fullName: string; displayName: string }) => {
        // TODO: 선택된 지역 처리
    };

    const handleFavoriteClick = (id: string) => {
        // TODO: 즐겨찾기 상세 페이지로 이동
    };

    return (
        <div className="min-h-screen w-full bg-gray-50 px-4 py-6 md:px-8 md:py-8 flex flex-col">
            <div className="max-w-7xl mx-auto w-full flex flex-col">
                <SearchBar
                    onSearch={handleSearch}
                    onSelectSuggestion={handleSelectSuggestion}
                />
                <div className="mb-8 md:mb-12">
                    <CurrentWeatherWidget />
                </div>
                <div className="flex-1 flex flex-col">
                    <FavoritesList favorites={favorites} onCardClick={handleFavoriteClick} />
                </div>
            </div>
        </div>
    );
};
