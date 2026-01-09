import { FavoriteIcon } from '@shared/ui/icon/FavoriteIcon';

interface DistrictSuggestion {
    fullName: string;
    displayName: string;
}

interface SearchedSuggestionsProps {
    suggestions: DistrictSuggestion[];
    favorites?: Set<string>;
    onSelect: (suggestion: DistrictSuggestion) => void;
    onToggleFavorite?: (suggestion: DistrictSuggestion) => void;
}

export const SearchedSuggestions = ({
    suggestions,
    favorites = new Set(),
    onSelect,
    onToggleFavorite,
}: SearchedSuggestionsProps) => {
    const handleFavoriteClick = (e: React.MouseEvent, suggestion: DistrictSuggestion) => {
        e.stopPropagation();
        onToggleFavorite?.(suggestion);
    };

    return (
        <div className="absolute top-full left-0 right-0 max-w-2xl bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
            {suggestions.map((result, index) => {
                const isFavorite = favorites.has(result.fullName);
                const key = `${result.fullName}-${index}`;
                const ariaLabel = isFavorite ? '즐겨찾기 제거' : '즐겨찾기 추가';
                return (
                    <div
                        key={key}
                        className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                        <button
                            type="button"
                            onClick={(e) => handleFavoriteClick(e, result)}
                            className="mr-2 p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
                            aria-label={ariaLabel}
                        >
                            <FavoriteIcon
                                className={`w-5 h-5 ${isFavorite ? 'text-blue-500' : 'text-gray-400'}`}
                                filled={isFavorite}
                            />
                        </button>
                        <button
                            type="button"
                            onClick={() => onSelect(result)}
                            className="flex-1 text-left"
                        >
                            <div className="text-sm text-gray-800">{result.displayName}</div>
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
