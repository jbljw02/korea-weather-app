import { getWeatherIconSrc } from '@shared/ui/icon/utis';

interface WeatherIconProps {
    icon: string;
    className?: string;
}

export const WeatherIcon = ({ icon, className = '' }: WeatherIconProps) => {
    return (
        <img
            src={getWeatherIconSrc(icon)}
            alt="weather icon"
            className={`w-16 h-16 ${className}`}
        />
    );
};
