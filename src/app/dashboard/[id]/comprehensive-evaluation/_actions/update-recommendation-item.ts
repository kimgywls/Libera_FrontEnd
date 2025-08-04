import axios from 'axios';
import { API_URL } from '@/app/constants';

const api = axios.create({ baseURL: API_URL });

interface UpdateRecommendationItemRequest {
    item_id: number;
    rank: number;
    suitability_type: string;
    non_subject_suitability: string;
    overall_evaluation: string;
    note: string;
    is_final_choice: boolean;
    is_hidden: boolean;
}

export const updateRecommendationItem = async (data: UpdateRecommendationItemRequest) => {
    try {
        const response = await api.put(
            `/api/v1/admin/recommendations/items/${data.item_id}/`,
            {
                rank: data.rank,
                suitability_type: data.suitability_type,
                non_subject_suitability: data.non_subject_suitability,
                overall_evaluation: data.overall_evaluation,
                note: data.note,
                is_final_choice: data.is_final_choice,
                is_hidden: data.is_hidden
            }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // 서버에서 받은 상세 에러 메시지 처리
            const errorDetail = error.response?.data?.detail;
            const errorMessage = error.response?.data?.message;

            if (Array.isArray(errorDetail) && errorDetail.length > 0) {
                const firstError = errorDetail[0];
                const detailMessage = firstError.msg || firstError.message || JSON.stringify(firstError);
                throw new Error(`검증 오류: ${detailMessage}`);
            } else if (errorDetail) {
                throw new Error(`서버 오류: ${errorDetail}`);
            } else if (errorMessage) {
                throw new Error(errorMessage);
            } else if (error.response?.status === 500) {
                throw new Error('서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            } else {
                throw new Error('추천 아이템 업데이트에 실패했습니다.');
            }
        }
        throw new Error('추천 아이템 업데이트에 실패했습니다.');
    }
}; 