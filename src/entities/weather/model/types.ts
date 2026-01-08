/**
 * API 문서에서는 엄격하게 required/optional 필드를 구분하고 있지 않지만, 실제 응답에 비어 들어왔거나 그럴 가능성이 있는 데이터들은 optional 처리
 * Internal Parameter(내부 매개변수) 또한 API 문서와 동일하게 작성하기 위해 추가했지만, 사용할 일이 없으므로 unknown 처리
 */

/**
 * 날씨 상태
 */
export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

/**
 * 바람 정보
 */
export interface Wind {
    speed: number;
    deg?: number; // 풍향(관측소에 따라 없을 수 있음)
    gust?: number; // 돌풍(바람이 약하면 없음)
}

/**
 * 구름 정보
 */
export interface Clouds {
    all: number;
}

/**
 * 강수 정보
 * 비/눈이 오지 않으면 데이터가 아예 없으므로 optional 처리
 */
export interface Precipitation {
    '1h'?: number;
    '3h'?: number;
}

/**
 * 현재 날씨 API 응답: /weather
 */
export interface CurrentWeatherResponse {
    coord: {
        lon: number;
        lat: number;
    };
    weather: WeatherCondition[];
    /** Internal Parameter */
    base?: unknown;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level?: number;
        grnd_level?: number;
    };
    visibility?: number;
    wind: Wind;
    clouds: Clouds;
    rain?: Precipitation;
    snow?: Precipitation;
    dt: number;
    sys: {
        /** Internal Parameter */
        type?: unknown;
        /** Internal Parameter */
        id?: unknown;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number | string;
}

/**
 * 5일/3시간 예보 리스트 아이템
 */
export interface ForecastItem {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level?: number;
        grnd_level?: number;
        humidity: number;
        /** Internal Parameter */
        temp_kf?: unknown;
    };
    weather: WeatherCondition[];
    clouds: Clouds;
    wind: Wind;
    visibility?: number;
    pop: number;
    rain?: { '3h': number };
    snow?: { '3h': number };
    sys: {
        pod: 'd' | 'n'; // 낮(d), 밤(n) 구분
    };
    dt_txt: string;
}

/**
 * 5일/3시간 예보 API 응답: /forecast
 */
export interface ForecastResponse {
    cod: string | number;
    /** Internal Parameter */
    message: number | string | unknown;
    cnt: number;
    list: ForecastItem[];
    city: {
        id: number;
        name: string;
        coord: {
            lat: number;
            lon: number;
        };
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
}