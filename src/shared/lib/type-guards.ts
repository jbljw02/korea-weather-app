/**
 * 값이 null 또는 undefined 인지 확인
 * @param value 검사할 값
 * @returns 값이 null 또는 undefined 이면 true, 아니면 false
 */
export function isNil(value: unknown): value is null | undefined {
    return value == null;
}

/**
 * 값이 null 또는 undefined가 아님을 타입 가드로 확인
 * @param value 검사할 값
 * @returns 값이 null 또는 undefined가 아니면 true (타입이 NonNullable<T>으로 좁혀집니다), 아니면 false
 */
export function isNotNil<T>(value: T): value is NonNullable<T> {
    return value !== null && value !== undefined;
}