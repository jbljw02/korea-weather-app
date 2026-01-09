/**
 * Unix 타임스탬프(초 단위)를 한국어 시간 문자열로 변환
 * @param timestamp - Unix 타임스탬프 (초 단위)
 * @returns 시간 문자열 (예: "13:00", "09:30")
 */
export const formatTime = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
};
