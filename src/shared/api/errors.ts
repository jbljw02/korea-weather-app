import type { AxiosError } from 'axios';

export const ERROR_MESSAGE = {
    BAD_REQUEST_ERROR: '요청을 처리할 수 없습니다. 입력 정보를 다시 확인해주세요.',
    NETWORK_ERROR: '인터넷 연결이 불안정합니다. 와이파이 또는 데이터 연결을 확인해주세요.',
    SERVER_ERROR: '일시적인 서비스 오류입니다. 잠시 후 다시 시도해주세요.',
    API_KEY_ERROR: '날씨 정보를 불러올 수 없습니다. (서비스 설정 오류)',
    NOT_FOUND_ERROR: '해당 지역을 찾을 수 없습니다. 검색어를 확인해주세요.',
    FORBIDDEN_ERROR: '접근이 제한되었습니다. 잠시 후 다시 이용해주세요.',
} as const;

export const ERROR_STATUS = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
} as const;

export const handleApiError = (error: AxiosError): Error => {
    if (error.response) {
        const status = error.response.status;

        if (status === ERROR_STATUS.BAD_REQUEST) {
            return new Error(ERROR_MESSAGE.BAD_REQUEST_ERROR);
        }

        if (status === ERROR_STATUS.UNAUTHORIZED) {
            return new Error(ERROR_MESSAGE.API_KEY_ERROR);
        }

        if (status === ERROR_STATUS.FORBIDDEN) {
            return new Error(ERROR_MESSAGE.FORBIDDEN_ERROR);
        }

        if (status === ERROR_STATUS.NOT_FOUND) {
            return new Error(ERROR_MESSAGE.NOT_FOUND_ERROR);
        }

        if (status >= ERROR_STATUS.INTERNAL_SERVER_ERROR) {
            return new Error(ERROR_MESSAGE.SERVER_ERROR);
        }

        return new Error(ERROR_MESSAGE.SERVER_ERROR);
    }

    if (error.request) {
        return new Error(ERROR_MESSAGE.NETWORK_ERROR);
    }

    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
    return new Error(errorMessage);
};
