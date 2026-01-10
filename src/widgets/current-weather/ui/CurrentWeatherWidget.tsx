import { WeatherCard } from '@entities/weather/ui/WeatherCard';
import { WeatherCardLoading } from '@entities/weather/ui/WeatherCardLoading';
import { WeatherCardError } from '@entities/weather/ui/WeatherCardError';
import { useCurrentLocation, useLocationName } from '@entities/location';
import { useCurrentWeather, useForecast } from '@entities/weather';
import { prepareHourlyForecast } from '@entities/weather/lib/prepareHourlyForecast';
import { isNil, isNotNil } from '@shared/lib/type-guards';

export const CurrentWeatherWidget = () => {
    const { position, isLoading: isLocationLoading, error: locationError } = useCurrentLocation();

    const lat = position?.lat ?? null;
    const lon = position?.lon ?? null;

    const {
        data: locationName,
        isLoading: isLocationNameLoading,
        error: locationNameError,
    } = useLocationName(lat, lon);

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

    const isLoading = isLocationLoading || isLocationNameLoading || isWeatherLoading || isForecastLoading;
    const hasError = locationError || locationNameError || weatherError || forecastError;

    const getErrorMessage = () => {
        if (locationError) {
            return '위치 정보를 가져올 수 없습니다. 위치 권한을 확인해주세요.';
        }
        if (locationNameError) {
            return '위치 정보를 가져올 수 없습니다.';
        }
        if (weatherError || forecastError) {
            return '날씨 정보를 가져올 수 없습니다.';
        }
        if(isNil(lat) || isNil(lon)) {
            return '해당 장소의 정보가 제공되지 않습니다.';
        }
        
        return '날씨 정보를 가져오던 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    };

    const locationNameValue = locationName ?? '내 위치';
    const hourlyForecast = prepareHourlyForecast(forecast);

    return (
        <div className="h-[350px] md:h-[400px]">
            {isLoading && <WeatherCardLoading />}
            {hasError && <WeatherCardError message={getErrorMessage()} />}
            {!isLoading && !hasError && isNotNil(currentWeather) && (
                <WeatherCard
                    location={locationNameValue}
                    temperature={Math.round(currentWeather.main.temp)}
                    minTemp={currentWeather.main.temp_min}
                    maxTemp={currentWeather.main.temp_max}
                    icon={currentWeather.weather[0]?.icon}
                    description={currentWeather.weather[0]?.description}
                    hourlyForecast={hourlyForecast}
                />
            )}
        </div>
    );
};