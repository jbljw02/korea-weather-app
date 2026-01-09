interface DistrictSuggestion {
    fullName: string;
    displayName: string;
}

interface SearchedSuggestionsProps {
    suggestions: DistrictSuggestion[];
    onSelect: (suggestion: DistrictSuggestion) => void;
}

export const SearchedSuggestions = ({ suggestions, onSelect }: SearchedSuggestionsProps) => {
    return (
        <div className="absolute top-full left-0 right-0 max-w-2xl bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
            {suggestions.map((result, index) => (
                <button
                    key={`${result.fullName}-${index}`}
                    type="button"
                    onClick={() => onSelect(result)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                    <div className="text-sm text-gray-800">{result.displayName}</div>
                </button>
            ))}
        </div>
    );
};
