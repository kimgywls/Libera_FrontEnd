import axios from 'axios';

import { API_URL } from '@/app/constants';
import type { GetRecommendationsParams, GetRecommendationsResponse } from '@/app/types/university';

const api = axios.create({ baseURL: API_URL });

export const getSavedRecommendations = async (
    params: GetRecommendationsParams
): Promise<GetRecommendationsResponse> => {
    try {
        const { student_id, rec_status } = params;

        const queryParams = new URLSearchParams();
        if (rec_status) {
            queryParams.append('rec_status', rec_status);
        }

        const response = await api.get<GetRecommendationsResponse>(
            `/api/v1/admin/recommendations/student/${student_id}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || '저장된 추천 학교 조회에 실패했습니다.');
        }
        throw new Error('저장된 추천 학교 조회에 실패했습니다.');
    }
}; 