import { getLastLocationPart } from '@shared/lib/string';

interface LocationNameProps {
    location: string;
    className?: string;
    shouldBreakLine?: boolean;
}

export const LocationName = ({ location, className = '', shouldBreakLine = false }: LocationNameProps) => {
    const parts = getLastLocationPart(location).split(/\s+/);

    return (
        <span className={className}>
            {parts.map((part, index, array) => {
                const isNotLast = index !== array.length - 1;
                return (
                    <span key={index} className={shouldBreakLine ? 'block md:inline' : ''}>
                        {part}
                        {isNotLast && (
                            shouldBreakLine ? (
                                <>
                                    <br className="md:hidden" />
                                    <span className="hidden md:inline"> </span>
                                </>
                            ) : (
                                <span> </span>
                            )
                        )}
                    </span>
                );
            })}
        </span>
    );
};
