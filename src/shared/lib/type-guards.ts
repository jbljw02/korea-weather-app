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

/**
 * 주어진 배열이 비어있거나(null, undefined 포함) 비어있는 배열인지 확인
 * @param array 검사할 배열 (T[] | undefined | null)
 * @returns 배열이 null, undefined 또는 [](빈 배열)이면 true, 그렇지 않으면 false
 */
export function isEmptyArray<T>(
    array: T[] | undefined | null,
): array is null | undefined | [] {
    return array == null || array.length === 0;
}

/**
 * 주어진 배열이 존재하며, 비어있지 않은 배열임을 타입 가드로 확인
 * @param array 검사할 배열 (T[] | undefined | null)
 * @returns 배열이 null, undefined가 아니고, 요소가 하나 이상이면 true (즉, 배열임을 보장), 아니면 false
 */
export function isNotEmptyArray<T>(
    array: T[] | undefined | null,
): array is T[] {
    return array != null && array.length > 0;
}