/**
 * 주어진 값이 빈 문자열(null, undefined 포함)인지 확인
 * @param value - 검사할 문자열 값
 * @returns 값이 null, undefined 또는 ''(빈 문자열)이면 true, 그렇지 않으면 false
 */
export const isEmptyString = (value: string | null | undefined): boolean => {
    return value == null || value === '';
};

/**
 * 주어진 값이 빈 문자열(null, undefined 포함)이 아닌지 확인
 * @param value - 검사할 문자열 값 (string | null | undefined)
 * @returns 값이 null, undefined 또는 ''(빈 문자열)이 아니면 true (즉, 문자열로 좁혀짐), 그렇지 않으면 false
 */
export function isNotEmptyString(
    value: string | null | undefined,
): value is string {
    return value != null && value !== '';
}
