import axios from 'axios';

import { API_URL } from '@/app/constants';
import type { SaveRecommendationRequest, SaveRecommendationResponse } from '@/app/types/university';

const api = axios.create({ baseURL: API_URL });

export const saveRecommendations = async (
    data: SaveRecommendationRequest
): Promise<SaveRecommendationResponse> => {
    try {
        const response = await api.post<SaveRecommendationResponse>(
            '/api/v1/admin/recommendations/',
            data
        );

        // console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // detail 배열에서 구체적인 에러 메시지 추출
            const errorDetails = error.response?.data?.detail;
            if (Array.isArray(errorDetails) && errorDetails.length > 0) {
                const firstError = errorDetails[0];
                const errorMessage = firstError.msg || firstError.message || JSON.stringify(firstError);
                throw new Error(`검증 오류: ${errorMessage}`);
            }

            throw new Error(error.response?.data?.message || '추천 학교 저장에 실패했습니다.');
        }
        throw new Error('추천 학교 저장에 실패했습니다.');
    }
}; 