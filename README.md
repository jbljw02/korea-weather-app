# 대한민국 날씨 앱

대한민국 지역의 날씨 정보를 제공하는 React 기반 웹 애플리케이션입니다.

<kbd><img width="400" height="800" alt="image" src="https://github.com/user-attachments/assets/ace52cf0-8081-4e02-9369-53f42a6112ff" /></kbd> <kbd><img width="400" height="800" alt="image" src="https://github.com/user-attachments/assets/b5f1ad14-9fc7-4a1f-b0d7-3d523afa22f9" /></kbd>

## 프로젝트 구조

```
src/
├── app/
│   └── providers/          # React Query Provider
├── pages/
│   ├── main/              # 메인 페이지
│   └── detail/            # 상세 페이지
├── widgets/
│   ├── current-weather/   # 현재 위치 날씨 위젯
│   ├── weather-detail/    # 상세 날씨 위젯
│   └── favorites-list/    # 즐겨찾기 리스트
├── features/
│   ├── search-location/   # 지역 검색 기능
│   └── toggle-favorite/   # 즐겨찾기 토글
├── entities/
│   ├── weather/           # 날씨 엔티티
│   ├── location/          # 위치 엔티티
│   ├── district/          # 행정구역 엔티티
│   └── favorite/          # 즐겨찾기 엔티티
└── shared/
    ├── api/               # API 클라이언트
    ├── lib/               # 유틸리티 함수
    ├── ui/                # 공용 UI 컴포넌트
    └── assets/            # 정적 파일
```

## 프로젝트 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 OpenWeather API 키를 추가합니다.

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

> **API 키 발급 방법**
> 1. [OpenWeather](https://openweathermap.org/)에 가입
> 2. API Keys 메뉴에서 API 키 발급
> 3. 발급받은 키를 `.env` 파일에 추가

### 3. 개발 서버 실행

```bash
npm run dev
```

애플리케이션이 `http://localhost:5173`에서 실행됩니다.

## 구현 기능

### 1. 현재 위치 기반 날씨 정보
- 앱 첫 진입 시 사용자의 현재 위치를 자동으로 감지
- 현재 기온, 최저/최고 기온, 시간대별 기온 표시
- 위치 권한 거부 시 적절한 에러 메시지 표시

### 2. 지역 검색
- 시/도, 시/군/구, 읍/면/동 등 모든 행정구역 단위로 검색 가능
- 초성 검색 지원(예: "ㅅㅇ" → "서울")
- 실시간 검색 결과 제안(300ms 디바운싱)
- 검색한 지역 선택 시 상세 페이지로 이동

### 3. 즐겨찾기
- 최대 6개 지역 등록 가능
- 즐겨찾기 이름(별칭) 편집 기능
- 현재 날씨, 최저/최고 기온 표시
- 카드 클릭 시 상세 페이지로 이동
- localStorage를 통한 즐겨찾기 지역 정보 영구 저장

### 4. 상세 날씨 페이지
- 현재 날씨 정보(기온, 날씨 상태, 아이콘)
- 시간대별 날씨(3시간 간격)
- 일일 예보(최대 5일, 낮/밤 기온 및 날씨)

### 5. UI/UX
- 반응형 디자인(모바일/데스크탑)
- 로딩 상태 표시
- 에러 상태에 대한 Fallback UI
- 토스트 알림(성공/에러 메시지)

## 기술 스택

### Core
- **React 19.2.0** - UI 라이브러리
- **TypeScript 5.9.3** - 타입 안정성
- **Vite 7.2.4** - 빌드 도구

### State Management & Data Fetching
- **Tanstack Query 5.0** - 서버 상태 관리 및 캐싱

### Styling
- **Tailwind CSS 3.4** - 유틸리티 기반 스타일링

### HTTP Client
- **Axios 1.6** - API 통신

### Utilities
- **es-hangul 2.3.8** - 한글 초성 검색
- **react-hot-toast 2.4.1** - 토스트 알림

## 기술적 의사결정

### 1. FSD(Feature-Sliced Design) 아키텍처

```
src/
├── app/          # 앱 초기화, 프로바이더
├── pages/        # 페이지 컴포넌트
├── widgets/      # 복합 UI 블록
├── features/     # 사용자 시나리오
├── entities/     # 비즈니스 엔티티
└── shared/       # 공유 유틸리티
```

**선택 이유:**
- 명확한 책임 분리로 유지보수성 향상
- 기능별 모듈화로 코드 재사용성 증가
- 레이어 간 의존성 규칙으로 코드 품질 보장

### 2. Tanstack Query

**주요 사용처:**
- 날씨 API 데이터 캐싱
- 자동 백그라운드 리페칭
- 로딩/에러 상태 관리

**선택 이유:**
- 서버 상태와 클라이언트 상태를 명확히 분리
- 자동 캐싱으로 불필요한 API 호출 감소
- 선언적인 데이터 fetching으로 코드 가독성 향상

```typescript
const { data, isLoading, error } = useCurrentWeather(lat, lon);
```

### 3. 지역 검색 알고리즘(초성 검색 + 우선순위 기반 정렬)

**구현:**
```typescript
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
```

**검색 알고리즘 특징:**
1. **초성 검색 자동 감지**
   - 검색어에 완성형 한글이 없으면 초성 검색으로 자동 전환
   - 예: "ㅅㅇ" → "서울", "서울특별시" 등 매칭

2. **정렬 우선순위**
   - 1순위: 전체 이름이 정확히 일치(예: "서울특별시")
   - 2순위: 행정구역 단위가 완전히 일치(시/도, 시/군/구, 읍/면/동, 리)
   - 3순위: 검색어로 시작하는 경우
   - 4순위: 이름이 짧은 것 우선(더 구체적인 지역)

3. **사용자 경험 최적화**
   - 의도한 지역을 상위에 배치
   - 관련성 높은 지역 우선 표시

**선택 이유:**
- 한글 입력 특성에 최적화
- 우선순위 기반 정렬로 원하는 결과를 빠르게 찾을 수 있음

### 4. 디바운싱(300ms)

**구현:**
```typescript
// features/search-location/model/useDistrictSearch.ts
useEffect(() => {
    const normalizedQuery = query.trim();
    if (isEmptyString(normalizedQuery)) {
        setDebouncedQuery('');
        return;
    }

    const timer = setTimeout(() => {
        setDebouncedQuery(query);
    }, 300);

    return () => {
        clearTimeout(timer);
    };
}, [query]);
```

**선택 이유:**
- 불필요한 검색 연산 감소로 인한 성능 향상
- 사용자 입력이 완료될 때까지 대기
- 300ms는 사용자가 체감하지 못하는 적절한 지연 시간
- 빈 검색어는 즉시 처리로 UX 향상

### 5. 좌표 조회 Fallback 전략

**구현:**
```typescript
// entities/location/lib/getCoordinatesWithFallback.ts
export const getCoordinatesWithFallback = async (fullName: string): Promise<LatLon | null> => {
    try {
        const parts = fullName.split('-');
        const dong = parts[parts.length - 1];
        const gu = parts.length > 2 ? parts[parts.length - 2] : null;

        // 1. 동 단위로 검색(가장 구체적)
        const dongResult = await tryGetCoordinates(dong);
        if (dongResult) {
            return dongResult;
        }

        // 2. 구 단위로 검색
        if (gu) {
            const guResult = await tryGetCoordinates(gu);
            if (guResult) {
                return guResult;
            }
        }

        // 3. 전체 이름으로 검색
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
```

**선택 이유:**
- API 실패 시 다단계 대안 제공(가령, 구체적인 행정구역으로 API 호출 시 실패하는 지역 존재)
- 동 → 구 → 전체 이름 순으로 검색하여 성공률 증가
- 다양한 형태의 지역명 입력 지원

### 6. localStorage를 통한 즐겨찾기 관리

**구현 방식:**
```typescript
// entities/favorite/lib/storage.ts
const FAVORITES_STORAGE_KEY = 'weather-app-favorites';

// Set으로 존재 여부 확인 전용
export const getFavorites = (): Set<string> => {
    try {
        const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (isNil(stored)) {
            return new Set();
        }
        const favorites: FavoriteItem[] = JSON.parse(stored);
        return new Set(favorites.map((item) => item.fullName));
    } catch {
        return new Set();
    }
};

// 전체 즐겨찾기 목록 조회 전용
export const getFavoriteItems = (): FavoriteItem[] => {
    try {
        const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (isNil(stored)) {
            return [];
        }
        return JSON.parse(stored);
    } catch {
        return [];
    }
};

export const toggleFavorite = (item: FavoriteItem): boolean => {
    try {
        const favorites = getFavoriteItems();
        const exists = favorites.some((fav) => fav.fullName === item.fullName);
        if (exists) {
            const filtered = favorites.filter((fav) => fav.fullName !== item.fullName);
            localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(filtered));
            return false;
        }

        favorites.push(item);
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
        return true;
    } catch {
        return false;
    }
};

export const updateFavoriteDisplayName = (fullName: string, newDisplayName: string): boolean => {
    try {
        const favorites = getFavoriteItems();
        const item = favorites.find((fav) => fav.fullName === fullName);
        if (isNil(item)) {
            return false;
        }

        item.displayName = newDisplayName;
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
        return true;
    } catch {
        return false;
    }
};
```

**선택 이유:**
- 별도 백엔드 없이 즐겨찾기 기능 구현
- 브라우저 재시작 후에도 데이터 유지
- 간단한 CRUD 요구사항 반영에 적절한 스펙

### 7. es-hangul

**주요 사용처:**
- 한글 초성 검색 기능 구현
- 검색어에서 초성 추출 및 매칭

**선택이유:**
- Tree-shaking 지원을 통한 가벼운 용량
- 초성 검색에 특화된 함수를 제공하여 별도 로직 구현 불필요
- 검색 대상 데이터가 많아도 매우 빠른 초성 변환 및 비교 속도

### 8. react-hot-toast

**사용 사례:**
- 즐겨찾기 추가/삭제 알림
- 즐겨찾기 6개 초과 시 에러 알림
- 좌표 조회 실패 알림
- 이름 변경 성공/실패 알림

**선택 이유:**
- 매우 가벼운 번들 사이즈(약 5KB)
- Headless 기반 UI 커스터마이징 100% 가능(`<div>` 태그 사용 등)
- 별도의 CSS 파일 import 불필요
