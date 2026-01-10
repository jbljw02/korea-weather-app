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


/**
 * 날짜 문자열 또는 Date 객체에서 요일과 날짜를 반환
 * @param dateInput - 날짜 문자열 (예: "2024-01-15") 또는 Date 객체
 * @returns 요일과 날짜 정보 (예: { dayOfWeek: "토", label: "오늘" }, { dayOfWeek: "월", label: "01.12" })
 */
export const formatDateWithDay = (dateInput: string | Date, isToday = false): { dayOfWeek: string; label: string } => {
    const date = typeof dateInput === 'string'
        ? (() => {
            const [year, month, day] = dateInput.split('-').map(Number);
            return new Date(year, month - 1, day);
        })()
        : dateInput;

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dayOfWeek = date.toLocaleDateString('ko-KR', { weekday: 'short' });

    if (isToday) {
        return { dayOfWeek, label: '오늘' };
    }

    if (date.toDateString() === tomorrow.toDateString()) {
        return { dayOfWeek, label: '내일' };
    }

    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return { dayOfWeek, label: `${month}.${day}` };
};
