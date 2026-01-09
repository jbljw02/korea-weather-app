import type { ForecastResponse } from '../model/types';
import { isNil } from '@shared/lib/type-guards';
import { formatTime } from '@shared/lib/date';

interface HourlyForecastItem {
    time: string;
    icon: string;
    temp: number;
}

export const prepareHourlyForecast = (forecast: ForecastResponse | null | undefined): HourlyForecastItem[] => {
    if (isNil(forecast)) {
        return [];
    }

    const now = Date.now();

    const hourlyForecast = forecast.list
        .filter((item) => item.dt * 1000 >= now)
        .slice(0, 5)
        .map((item) => ({
            time: formatTime(item.dt),
            icon: item.weather[0]?.icon ?? '01d',
            temp: Math.round(item.main.temp),
        }));

    return hourlyForecast;
};
