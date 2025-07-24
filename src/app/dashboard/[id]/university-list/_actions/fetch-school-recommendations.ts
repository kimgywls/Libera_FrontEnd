import axios from 'axios';

import { API_URL } from '@/app/constants';
import type { SchoolRecommendationResponse } from '@/app/types/university';

if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

const api = axios.create({ baseURL: API_URL });

export const fetchSchoolRecommendations = async (
    studentId: number
): Promise<SchoolRecommendationResponse> => {
    try {
        const { data } = await api.get<SchoolRecommendationResponse>(`/api/v1/school-recommendations/${studentId}/by-desired-departments`);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // 서버 에러 메시지 추출
            const serverError = error.response?.data?.detail || error.response?.data?.message || '서버 오류가 발생했습니다';

            // 500 에러에 대한 특별 처리
            if (error.response?.status === 500) {
                const customError = new Error(`학교 추천 시스템에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요. (오류: ${serverError})`);
                customError.name = 'SchoolRecommendationError';
                throw customError;
            }

            const customError = new Error(`학교 추천 조회 실패: ${serverError}`);
            customError.name = 'SchoolRecommendationError';
            throw customError;
        }
        throw new Error('네트워크 오류가 발생했습니다');
    }
}; 