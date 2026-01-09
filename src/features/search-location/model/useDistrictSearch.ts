import { useState, useMemo, useRef } from 'react';
import { searchDistricts } from '@entities/district/lib';
import { isEmptyArray } from '@shared/lib/type-guards';
import { isEmptyString } from '@shared/lib/string';

interface DistrictSuggestion {
    fullName: string;
    displayName: string;
}

interface UseDistrictSearchProps {
    onSelectSuggestion: (suggestion: DistrictSuggestion) => void;
}

export const useDistrictSearch = ({ onSelectSuggestion }: UseDistrictSearchProps) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const searchResults = useMemo(() => {
        const normalizedQuery = query.trim();
        if (isEmptyString(normalizedQuery)) {
            return [];
        }

        const result = searchDistricts(query, 10);
        const districts = result.districts.map((district) => ({
            fullName: district.fullName,
            displayName: district.fullName.replace(/-/g, ' '),
        }));
        return districts;
    }, [query]);

    const handleSelectSuggestion = (suggestion: DistrictSuggestion) => {
        onSelectSuggestion(suggestion);
        setQuery('');
        setIsFocused(false);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e?: React.FocusEvent) => {
        // 포커스가 컨테이너 내부로 이동하는 경우 blur 무시
        if (e) {
            const relatedTarget = e.relatedTarget;
            if (containerRef.current?.contains(relatedTarget)) {
                return;
            }
        }

        setIsFocused(false);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (containerRef.current && e.target instanceof Node && !containerRef.current.contains(e.target)) {
            setIsFocused(false);
        }
    };

    const showSuggestions = isFocused && !isEmptyArray(searchResults);

    return {
        query,
        setQuery,
        searchResults,
        isFocused,
        containerRef,
        showSuggestions,
        handleSelectSuggestion,
        handleFocus,
        handleBlur,
        handleMouseDown,
    };
};
