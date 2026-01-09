import { isNotEmptyArray, isNotNil } from '@shared/lib/type-guards';
import { getWeatherIconSrc } from '@shared/ui/icon/utis';

interface HourlyForecastItem {
    time: string;
    icon: string;
    temp: number;
}

interface WeatherCardProps {
    location: string;
    temperature: number;
    minTemp?: number;
    maxTemp?: number;
    icon: string;
    description?: string;
    hourlyForecast?: HourlyForecastItem[];
    isFavorite?: boolean;
    onClick?: () => void;
}

export const WeatherCard = ({
    location,
    temperature,
    minTemp,
    maxTemp,
    icon,
    description,
    hourlyForecast,
    isFavorite = false,
    onClick,
}: WeatherCardProps) => {
    const formatTime = (time: string, index: number) => {
        if (index === 0) {
            return '지금';
        }

        return time;
    };

    return (
        <div
            onClick={onClick}
            className={`h-full relative bg-white rounded-2xl shadow-sm p-6 ${onClick && 'cursor-pointer hover:shadow-md transition-shadow'}`}
        >
            {isFavorite && (
                <div className="absolute top-4 right-4">
                    <svg
                        className="w-5 h-5 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </div>
            )}

            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="mb-2">
                        <h3 className="font-semibold text-gray-800 text-base md:text-lg">{location}</h3>
                    </div>
                    {description && (
                        <p className="text-sm text-gray-500 mb-2">{description}</p>
                    )}
                </div>
                <img
                    src={getWeatherIconSrc(icon)}
                    alt="weather"
                    className="w-12 h-12 md:w-16 md:h-16"
                />
            </div>

            <div className="font-light text-gray-800 text-4xl md:text-5xl mb-2">
                {temperature}°
            </div>

            {isNotNil(minTemp) && isNotNil(maxTemp) && (
                <div className="text-sm text-gray-500 mb-6">
                    최저 {Math.round(minTemp)}° 최고 {Math.round(maxTemp)}°
                </div>
            )}

            {isNotEmptyArray(hourlyForecast) && (
                <div className="mt-6 md:mt-9 pt-7 md:pt-10 border-t border-gray-200">
                    <div className="flex justify-between items-start">
                        {hourlyForecast.map((item, index) => (
                            <div key={index} className="flex flex-col items-center flex-1">
                                <div className="text-xs text-gray-500 mb-2">{formatTime(item.time, index)}</div>
                                <img
                                    src={getWeatherIconSrc(item.icon)}
                                    alt="weather"
                                    className="w-10 h-10 mb-2"
                                />
                                <div className="text-sm font-medium text-gray-800">{item.temp}°</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
