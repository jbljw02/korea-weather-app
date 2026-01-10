import type { District, DistrictSearchResult } from '../model/types';
import { loadDistricts } from './loadDistricts';
import { isEmptyString } from '@shared/lib/string';
import { getChoseong } from 'es-hangul';

export const searchDistricts = (
    query: string,
    limit: number = 20
): DistrictSearchResult => {
    const normalizedQuery = query.trim();
    if (isEmptyString(normalizedQuery)) {
        return { districts: [], query: normalizedQuery };
    }

    const districts = loadDistricts();

    // 초성 검색 여부 판단
    const isChoseongQuery = /^[ㄱ-ㅎ\s]+$/.test(normalizedQuery);

    const matched = districts.filter((district) => {
        if (isChoseongQuery) {
            return getChoseong(district.fullName).includes(normalizedQuery);
        }

        return district.fullName.includes(normalizedQuery);
    });

    const sorted = matched.sort((a, b) => {
        // 1. 전체 이름 정확히 일치
        if (a.fullName === normalizedQuery) return -1;
        if (b.fullName === normalizedQuery) return 1;

        // 2. 완전 일치하는 경우 - 일반 검색
        if (!isChoseongQuery) {
            const aMatch = isUnitMatch(a, normalizedQuery);
            const bMatch = isUnitMatch(b, normalizedQuery);
            if (aMatch && !bMatch) return -1;
            if (!aMatch && bMatch) return 1;
        }

        // 3. 비교 대상 설정
        const targetA = isChoseongQuery ? getChoseong(a.fullName) : a.fullName;
        const targetB = isChoseongQuery ? getChoseong(b.fullName) : b.fullName;

        // 4. 시작 부분이 일치하는 경우
        const aStarts = targetA.startsWith(normalizedQuery);
        const bStarts = targetB.startsWith(normalizedQuery);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;

        // 5. 길이가 짧은 것 우선
        return a.fullName.length - b.fullName.length;
    });

    return {
        districts: sorted.slice(0, limit),
        query: normalizedQuery,
    };
};

const isUnitMatch = (district: District, query: string): boolean => {
    return (
        district.siDo === query ||
        district.siGunGu === query ||
        district.eupMyeonDong === query ||
        district.ri === query
    );
};