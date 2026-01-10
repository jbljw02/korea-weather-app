import { WeatherCard } from '@entities/weather/ui/WeatherCard';
import { WeatherCardLoading } from '@entities/weather/ui/WeatherCardLoading';
import { WeatherCardError } from '@entities/weather/ui/WeatherCardError';
import { DailyForecast } from '@entities/weather/ui/DailyForecast';
import { useCurrentWeather, useForecast } from '@entities/weather';
import { prepareHourlyForecast } from '@entities/weather/lib/prepareHourlyForecast';
import { prepareDailyForecast } from '@entities/weather/lib/prepareDailyForecast';
import { getFavoriteItems, useFavoriteCoordinates } from '@entities/favorite';
import { isNil, isNotNil } from '@shared/lib/type-guards';

interface WeatherDetailWidgetProps {
    id: string;
    lat: number | null;
    lon: number | null;
}

export const WeatherDetailWidget = ({ id, lat: initialLat, lon: initialLon }: WeatherDetailWidgetProps) => {
    const favoriteItems = getFavoriteItems();
    const favoriteItem = favoriteItems.find((item) => item.id === id || item.fullName === id);
    const coordinates = useFavoriteCoordinates(id, initialLat, initialLon);

    const lat = coordinates?.lat ?? initialLat;
    const lon = coordinates?.lon ?? initialLon;

    const {
        data: currentWeather,
        isLoading: isWeatherLoading,
        error: weatherError,
    } = useCurrentWeather(lat, lon);

    const {
        data: forecast,
        isLoading: isForecastLoading,
        error: forecastError,
    } = useForecast(lat, lon);

    const isLoading = isNil(coordinates) || isWeatherLoading || isForecastLoading;
    const hasError = weatherError || forecastError || isNil(favoriteItem);

    const getErrorMessage = () => {
        if (isNil(favoriteItem)) {
            return '해당 지역을 찾을 수 없습니다.';
        }
        if (weatherError || forecastError) {
            return '날씨 정보를 가져올 수 없습니다.';
        }
        return '알 수 없는 오류가 발생했습니다.';
    };

    const locationName = favoriteItem?.displayName ?? favoriteItem?.fullName ?? '알 수 없는 지역';
    const hourlyForecast = prepareHourlyForecast(forecast);
    const dailyForecast = prepareDailyForecast(forecast);

    return (
        <>
            <div className="h-[350px] md:h-[400px]">
                {isLoading && <WeatherCardLoading />}
                {hasError && <WeatherCardError message={getErrorMessage()} />}
                {!isLoading && !hasError && isNotNil(currentWeather) && (
                    <WeatherCard
                        location={locationName}
                        temperature={Math.round(currentWeather.main.temp)}
                        minTemp={currentWeather.main.temp_min}
                        maxTemp={currentWeather.main.temp_max}
                        icon={currentWeather.weather[0]?.icon}
                        description={currentWeather.weather[0]?.description}
                        hourlyForecast={hourlyForecast}
                    />
                )}
            </div>

            {!isLoading && !hasError && isNotNil(currentWeather) && (
                <DailyForecast forecast={dailyForecast} />
            )}
        </>
    );
};
