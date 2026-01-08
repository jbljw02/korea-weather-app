export interface District {
    // 전체 주소 문자열 (예: 서울특별시-종로구-청운동)
    fullName: string;
    // 시/도 (예: 서울특별시)
    siDo: string;
    // 구/군 (예: 종로구)
    siGunGu?: string;
    // 동/면 (예: 청운동)
    eupMyeonDong?: string;
    // 리 (예: 청운리)
    ri?: string;
}

export interface DistrictSearchResult {
    districts: District[];
    query: string;
}

export interface DistrictSearchResult {
    districts: District[];
    query: string;
}
