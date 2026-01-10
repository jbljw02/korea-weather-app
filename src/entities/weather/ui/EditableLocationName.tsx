import { useState, useRef, useEffect } from 'react';
import { LocationName } from './LocationName';
import { EditIcon } from '@shared/ui/icon/EditIcon';

interface EditableLocationNameProps {
    location: string;
    isFavorite: boolean;
    fullName?: string;
    shouldBreakLine: boolean;
    onUpdateDisplayName?: (fullName: string, newDisplayName: string) => void;
}

export const EditableLocationName = ({
    location,
    isFavorite,
    fullName,
    shouldBreakLine,
    onUpdateDisplayName,
}: EditableLocationNameProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(location);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    useEffect(() => {
        if (!isEditing) {
            setEditValue(location);
        }
    }, [location, isEditing]);

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isFavorite && onUpdateDisplayName && fullName) {
            setIsEditing(true);
            setEditValue(location);
        }
    };

    const handleSave = () => {
        if (onUpdateDisplayName && fullName && editValue.trim()) {
            onUpdateDisplayName(fullName, editValue.trim());
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditValue(location);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    if (isEditing) {
        return (
            <input
                ref={inputRef}
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className="font-semibold text-gray-800 text-base md:text-lg w-full border-b-2 border-blue-500 focus:outline-none bg-transparent"
                onClick={(e) => e.stopPropagation()}
            />
        );
    }

    return (
        <div className="flex items-center gap-1">
            <h3 className="font-semibold text-gray-800 text-base md:text-lg">
                <LocationName location={location} shouldBreakLine={shouldBreakLine} />
            </h3>
            {isFavorite && onUpdateDisplayName && (
                <button
                    type="button"
                    onClick={handleEditClick}
                    className="p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
                    aria-label="이름 편집"
                    title="이름 편집"
                >
                    <EditIcon className="w-[18px] h-[18px] md:w-5 md:h-5 text-gray-400" />
                </button>
            )}
        </div>
    );
};
