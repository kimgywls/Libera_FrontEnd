import axios from 'axios';
import { API_URL } from '@/app/constants';

const api = axios.create({ baseURL: API_URL });

interface DeleteRecommendationItemRequest {
    recommendation_id: number;
    item_id: number;
}

export const deleteRecommendationItem = async (data: DeleteRecommendationItemRequest) => {
    try {
        const response = await api.delete(
            `/api/v1/admin/recommendations/${data.recommendation_id}/items/${data.item_id}/`
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('API Error:', error.response?.data);
            throw new Error(error.response?.data?.message || '추천 아이템 삭제에 실패했습니다.');
        }
        throw new Error('추천 아이템 삭제에 실패했습니다.');
    }
}; 