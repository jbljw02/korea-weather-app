import type { District, DistrictSearchResult } from '../model/types';
import { loadDistricts } from './loadDistricts';
import { isEmptyString } from '@shared/lib/string';

export const searchDistricts = (
    query: string,
    limit: number = 20
): DistrictSearchResult => {
    const normalizedQuery = query.trim();
    if (isEmptyString(normalizedQuery)) {
        return {
            districts: [],
            query: normalizedQuery,
        };
    }

    const districts = loadDistricts();

    const matched = districts.filter((district) =>
        district.fullName.includes(normalizedQuery)
    );

    // 정확도 순으로 정렬
    const sorted = matched.sort((a, b) => {
        // 1. 정확히 일치하는 경우
        if (a.fullName === normalizedQuery) {
            return -1;
        }
        if (b.fullName === normalizedQuery) {
            return 1;
        }

        // 2. 완전 일치하는 경우 우선
        const aIsUnitMatch = isUnitMatch(a, normalizedQuery);
        const bIsUnitMatch = isUnitMatch(b, normalizedQuery);
        if (aIsUnitMatch && !bIsUnitMatch) {
            return -1;
        }
        if (!aIsUnitMatch && bIsUnitMatch) {
            return 1;
        }

        // 3. 시작 부분이 일치하는 경우
        if (a.fullName.startsWith(normalizedQuery)) {
            return -1;
        }
        if (b.fullName.startsWith(normalizedQuery)) {
            return 1;
        }

        // 4. 길이가 짧은 것 우선(상위 행정구역일 확률 높음)
        return a.fullName.length - b.fullName.length;
    });

    const sliced = sorted.slice(0, limit);
    return {
        districts: sliced,
        query: normalizedQuery,
    };
};

/**
 * 행정구역 단위(단어) 완전 일치 여부 확인
 * e.g. '신사동'이라고 검색했을 때, '신사동 고개'가 아닌 '신사동'이 우선되도록
 * @param district - 행정구역 정보
 * @param query - 검색어
 * @returns 완전 일치 여부
 */
const isUnitMatch = (district: District, query: string): boolean => {
    return (
        district.siDo === query ||
        district.siGunGu === query ||
        district.eupMyeonDong === query ||
        district.ri === query
    );
};
