import { getCoordinatesByLocationName } from '../api';
import { isNotEmptyArray } from '@shared/lib/type-guards';

interface LatLon {
    lat: number;
    lon: number;
}

const tryGetCoordinates = async (query: string): Promise<LatLon | null> => {
    const response = await getCoordinatesByLocationName(`${query},KR`, 1);
    if (isNotEmptyArray(response)) {
        return { lat: response[0].lat, lon: response[0].lon };
    }
    return null;
};

/**
 * 한국 행정구역 이름(fullName)을 기반으로 좌표를 검색
 * 동 -> 구 -> 전체 이름 순으로 Fallback 전략을 사용하여 검색 성공률을 증가
 * @param fullName 예: "서울특별시-성동구-홍익동"
 */
export const getCoordinatesWithFallback = async (fullName: string): Promise<LatLon | null> => {
    try {
        const parts = fullName.split('-');
        const dong = parts[parts.length - 1];
        const gu = parts.length > 2 ? parts[parts.length - 2] : null;

        const dongResult = await tryGetCoordinates(dong);
        if (dongResult) {
            return dongResult;
        }

        if (gu) {
            const guResult = await tryGetCoordinates(gu);
            if (guResult) {
                return guResult;
            }
        }

        const fullNameSpace = fullName.replace(/-/g, ' ');
        const fullNameResult = await tryGetCoordinates(fullNameSpace);
        if (fullNameResult) {
            return fullNameResult;
        }

        return null;
    } catch (error) {
        return null;
    }
};