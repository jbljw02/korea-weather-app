import { useState } from 'react';
import { SearchIcon } from '@shared/ui/icon/SearchIcon';

interface SearchBarProps {
    onSearch: (query: string) => void;
    suggestions?: Array<{ fullName: string; displayName: string }>;
    onSelectSuggestion: (suggestion: { fullName: string; displayName: string }) => void;
}

export const SearchBar = ({ onSearch, suggestions = [], onSelectSuggestion }: SearchBarProps) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const normalizedQuery = query.trim();

        if (normalizedQuery) {
            onSearch(normalizedQuery);
        }
    };

    return (
        <div className="mb-4">
            <form onSubmit={handleSubmit} className="relative mb-2 max-w-2xl">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <SearchIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="지역 검색"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </form>
        </div>
    );
};
