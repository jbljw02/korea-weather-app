import { SearchIcon } from '@shared/ui/icon/SearchIcon';
import { useDistrictSearch } from '../model/useDistrictSearch';
import { SearchedSuggestions } from './SearchedSuggestions';
import { isNotEmptyString } from '@shared/lib/string';

interface SearchBarProps {
    onSearch: (query: string) => void;
    suggestions?: Array<{ fullName: string; displayName: string }>;
    onSelectSuggestion: (suggestion: { fullName: string; displayName: string }) => void;
}

export const SearchBar = ({ onSearch, onSelectSuggestion }: SearchBarProps) => {
    const {
        query,
        setQuery,
        searchResults,
        containerRef,
        showSuggestions,
        handleSelectSuggestion,
        handleFocus,
        handleBlur,
        handleMouseDown,
    } = useDistrictSearch({ onSelectSuggestion });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const normalizedQuery = query.trim();

        if (isNotEmptyString(normalizedQuery)) {
            onSearch(normalizedQuery);
            handleBlur();
        }
    };

    return (
        <div ref={containerRef} className="mb-4 relative" onMouseDown={handleMouseDown}>
            <form onSubmit={handleSubmit} className="relative mb-2 max-w-2xl">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                    <SearchIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="지역 검색"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </form>
            {showSuggestions && (
                <SearchedSuggestions
                    suggestions={searchResults}
                    onSelect={handleSelectSuggestion}
                />
            )}
        </div>
    );
};
