import { FavoriteIcon } from '@shared/ui/icon/FavoriteIcon';
import type { DistrictSuggestion } from '@entities/district';

interface FavoriteCardErrorProps {
    displayName?: string;
    fullName?: string;
    onToggleFavorite?: (item: DistrictSuggestion) => void;
}

export const FavoriteCardError = ({ displayName, fullName, onToggleFavorite }: FavoriteCardErrorProps) => {
    const message = displayName ? `${displayName}의 정보가 제공되지 않습니다.` : '해당 장소의 정보가 제공되지 않습니다.';

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onToggleFavorite && fullName) {
            onToggleFavorite({
                fullName,
                displayName: displayName ?? fullName,
            });
        }
    };

    return (
        <div className="w-full h-full bg-white rounded-2xl shadow-sm p-4 flex flex-col items-center justify-center text-gray-400 min-h-[170px] relative">
            {onToggleFavorite && (
                <div className="absolute top-4 right-4">
                    <button
                        type="button"
                        onClick={handleFavoriteClick}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        aria-label="즐겨찾기 제거"
                    >
                        <FavoriteIcon className="w-5 h-5 text-blue-500" filled={true} />
                    </button>
                </div>
            )}
            <p className="text-sm text-center">{message}</p>
        </div>
    );
};
