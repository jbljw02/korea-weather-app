import { getLastLocationPart } from '@shared/lib/string';

interface LocationNameProps {
    location: string;
    className?: string;
}

export const LocationName = ({ location, className = '' }: LocationNameProps) => {
    const parts = getLastLocationPart(location).split(/\s+/);

    return (
        <span className={className}>
            {parts.map((part, index, array) => (
                <span key={index} className="block md:inline">
                    {part}
                    {index < array.length - 1 && (
                        <>
                            <br className="md:hidden" />
                            <span className="hidden md:inline"> </span>
                        </>
                    )}
                </span>
            ))}
        </span>
    );
};
