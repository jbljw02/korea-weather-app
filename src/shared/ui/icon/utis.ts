import clearDay from '@shared/assets/weather/clear-day.png';
import clearNight from '@shared/assets/weather/clear-night.png';
import partlyCloudyDay from '@shared/assets/weather/partly-cloudy-day.png';
import cloudy from '@shared/assets/weather/cloudy.png';
import rain from '@shared/assets/weather/rain.png';
import snow from '@shared/assets/weather/snow.png';
import thunder from '@shared/assets/weather/thunder.png';
import mist from '@shared/assets/weather/mist.png';

const ICON_MAP: Record<string, string> = {
    // 맑음
    '01d': clearDay,
    '01n': clearNight,

    // 구름 조금
    '02d': partlyCloudyDay,
    '02n': cloudy, // 밤(구름) 아이콘이 없음로 cloudy로 대체

    // 구름 많음(흐림)
    '03d': cloudy, '03n': cloudy,
    '04d': cloudy, '04n': cloudy,

    // 비
    '09d': rain, '09n': rain,
    '10d': rain, '10n': rain,

    // 천둥번개
    '11d': thunder, '11n': thunder,

    // 눈
    '13d': snow, '13n': snow,

    // 안개
    '50d': mist, '50n': mist,
};

export const getWeatherIconSrc = (iconCode: string): string => {
    return ICON_MAP[iconCode] ?? clearDay;
};