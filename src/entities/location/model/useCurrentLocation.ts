import { useState, useEffect } from 'react';

interface Position {
    lat: number;
    lon: number;
}

interface UseCurrentLocationReturn {
    position: Position | null;
    isLoading: boolean;
    error: GeolocationPositionError | Error | null;
}

export const useCurrentLocation = (): UseCurrentLocationReturn => {
    const [position, setPosition] = useState<Position | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<GeolocationPositionError | Error | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError(new Error('Geolocation is not supported by this browser.'));
            setIsLoading(false);
            return;
        }

        const options: PositionOptions = {
            enableHighAccuracy: true, // 정확한 위치 정보 사용
            timeout: 10000,
            maximumAge: 0,
        };

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition({
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude,
                });
                setIsLoading(false);
            },
            (err) => {
                setError(err);
                setIsLoading(false);
            },
            options
        );
    }, []);

    return { position, isLoading, error };
};
