import { getWeatherIconSrc } from '@shared/ui/icon/utis';
import type { DailyForecastItem } from '../lib/prepareDailyForecast';
import { isEmptyArray } from '@shared/lib/type-guards';
import { DateLabel } from './DateLabel';

interface DailyForecastProps {
    forecast: DailyForecastItem[];
}

export const DailyForecast = ({ forecast }: DailyForecastProps) => {
    if (isEmptyArray(forecast)) {
        return null;
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="space-y-3">
                {forecast.map((item, index) => {
                    return (
                        <div key={index} className="flex items-center py-2 border-b border-gray-100 last:border-0">
                            <DateLabel date={item.date} />
                            <div className="flex items-center gap-3 flex-1 justify-center">
                                <img
                                    src={getWeatherIconSrc(item.dayTime.icon)}
                                    alt={item.dayTime.description}
                                    className="w-8 h-8"
                                />
                                <img
                                    src={getWeatherIconSrc(item.night.icon)}
                                    alt={item.night.description}
                                    className="w-8 h-8"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-400">{item.minTemp}°</span>
                                <span className="text-sm font-medium text-gray-800">{item.maxTemp}°</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
