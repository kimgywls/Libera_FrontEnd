import axios from 'axios';

import { API_URL } from '@/app/constants';
import type { SaveRecommendationResponse, AddRecommendationItemRequest } from '@/app/types/university';

const api = axios.create({ baseURL: API_URL });

export const addRecommendationItem = async (
    recommendationId: number,
    data: AddRecommendationItemRequest
): Promise<SaveRecommendationResponse> => {
    try {
        console.log('API Request Data:', data);
        const response = await api.post<SaveRecommendationResponse>(
            `/api/v1/admin/recommendations/${recommendationId}/items`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                timeout: 10000,
            }
        );
        console.log('API Response:', response.data);

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API Error:', error.response?.data);
            console.error('Error Details:', error.response?.data?.detail);

            // detail 배열에서 구체적인 에러 메시지 추출
            const errorDetails = error.response?.data?.detail;
            if (Array.isArray(errorDetails) && errorDetails.length > 0) {
                const firstError = errorDetails[0];
                const errorMessage = firstError.msg || firstError.message || firstError;
                throw new Error(`검증 오류: ${errorMessage}`);
            }

            throw new Error(error.response?.data?.message || '추천 학교 추가에 실패했습니다.');
        }
        throw new Error('추천 학교 추가에 실패했습니다.');
    }
}; 