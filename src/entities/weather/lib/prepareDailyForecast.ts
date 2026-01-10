import type { ForecastResponse } from '../model/types';
import { isNil } from '@shared/lib/type-guards';

interface DailyForecastData {
    temps: number[];
    dayTime: {
        temps: number[];
        icons: string[];
        descriptions: string[];
        icon: string;
        description: string;
    };
    night: {
        temps: number[];
        icons: string[];
        descriptions: string[];
        icon: string;
        description: string;
    };
}

export interface DailyForecastItem {
    date: string;
    minTemp: number;
    maxTemp: number;
    dayTime: {
        icon: string;
        description: string;
        temp: number;
    };
    night: {
        icon: string;
        description: string;
        temp: number;
    };
}

export const prepareDailyForecast = (forecast: ForecastResponse | null | undefined): DailyForecastItem[] => {
    if (isNil(forecast)) {
        return [];
    }

    const dailyMap = new Map<string, DailyForecastData>();

    const todayKey = new Date().toLocaleDateString('en-CA');

    forecast.list.forEach((item) => {
        const dateKey = new Date(item.dt * 1000).toLocaleDateString('en-CA');

        // 오늘 날짜 데이터는 제외
        if (dateKey === todayKey) {
            return;
        }

        if (!dailyMap.has(dateKey)) {
            dailyMap.set(dateKey, {
                temps: [],
                dayTime: {
                    temps: [],
                    icons: [],
                    descriptions: [],
                    icon: '',
                    description: '',
                },
                night: {
                    temps: [],
                    icons: [],
                    descriptions: [],
                    icon: '',
                    description: '',
                },
            });
        }

        const dayData = dailyMap.get(dateKey);
        if (isNil(dayData)) {
            return;
        }

        const itemDate = new Date(item.dt * 1000);
        const hour = itemDate.getHours();
        const isMorning = hour <= 12;

        dayData.temps.push(item.main.temp);

        if (isMorning) {
            const isFirstDayTime = dayData.dayTime.icons.length === 0;
            dayData.dayTime.temps.push(item.main.temp);
            dayData.dayTime.icons.push(item.weather[0].icon);
            dayData.dayTime.descriptions.push(item.weather[0].description);
            if (isFirstDayTime) {
                dayData.dayTime.icon = item.weather[0].icon;
                dayData.dayTime.description = item.weather[0].description;
            }
            if (hour === 9) {
                dayData.dayTime.icon = item.weather[0].icon;
                dayData.dayTime.description = item.weather[0].description;
            }
        } else {
            const isFirstNight = dayData.night.icons.length === 0;
            dayData.night.temps.push(item.main.temp);
            dayData.night.icons.push(item.weather[0].icon);
            dayData.night.descriptions.push(item.weather[0].description);
            if (isFirstNight) {
                dayData.night.icon = item.weather[0].icon;
                dayData.night.description = item.weather[0].description;
            }
            if (hour === 15) {
                dayData.night.icon = item.weather[0].icon;
                dayData.night.description = item.weather[0].description;
            }
        }
    });

    const dailyForecastEntries = Array.from(dailyMap.entries());
    const dailyForecast = dailyForecastEntries.map(([date, data]) => {
        const dayTimeTemp = Math.round(data.dayTime.temps.reduce((a, b) => a + b, 0) / data.dayTime.temps.length);
        const nightTemp = Math.round(data.night.temps.reduce((a, b) => a + b, 0) / data.night.temps.length);
        return {
            date,
            minTemp: Math.round(Math.min(...data.temps)),
            maxTemp: Math.round(Math.max(...data.temps)),
            dayTime: {
                icon: data.dayTime.icon,
                description: data.dayTime.description,
                temp: dayTimeTemp,
            },
            night: {
                icon: data.night.icon,
                description: data.night.description,
                temp: nightTemp,
            },
        };
    });

    return dailyForecast;
};