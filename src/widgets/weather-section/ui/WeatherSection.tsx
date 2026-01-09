import { getWeatherIconSrc } from '@shared/ui/icon/utis';

interface WeatherSectionProps {
    location: string;
    temperature: number;
    minTemp: number;
    maxTemp: number;
    description: string;
    icon: string;
    hourlyForecast: Array<{
        time: string;
        icon: string;
        temp: number;
    }>;
}

export const WeatherSection = ({
    location,
    temperature,
    minTemp,
    maxTemp,
    description,
    icon,
    hourlyForecast,
}: WeatherSectionProps) => {
    const currentTime = new Date().toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 text-white px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">오늘</h1>
                <span className="text-lg">{currentTime}</span>
            </div>

            <div className="flex flex-col items-center mb-8">
                <img
                    src={getWeatherIconSrc(icon)}
                    alt="weather"
                    className="w-32 h-32 mb-4"
                />
                <div className="text-6xl font-light mb-2">{temperature}°</div>
                <div className="text-xl mb-6">{description}</div>
                <div className="text-lg mb-2">{location}</div>
                <div className="text-base opacity-90">
                    최저 {minTemp}° 최고 {maxTemp}°
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-xl font-semibold mb-4">오늘의 날씨</h2>
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {hourlyForecast.map((forecast, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-20 bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center"
                        >
                            <div className="text-sm mb-2">{forecast.time}</div>
                            <img
                                src={getWeatherIconSrc(forecast.icon)}
                                alt="weather"
                                className="w-12 h-12 mb-2"
                            />
                            <div className="text-base font-medium">{forecast.temp}°</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
