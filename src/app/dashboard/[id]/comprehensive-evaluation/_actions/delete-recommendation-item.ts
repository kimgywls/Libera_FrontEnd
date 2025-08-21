import { universityApiService } from '@/app/lib/api-client';

interface DeleteRecommendationItemRequest {
    recommendation_id: number;
    item_id: number;
}

export const deleteRecommendationItem = async (data: DeleteRecommendationItemRequest) => {
    try {
        const response = await universityApiService.delete(
            `/api/v1/admin/recommendations/${data.recommendation_id}/items/${data.item_id}/`
        );
        return response;
    } catch (error) {
        console.error('[deleteRecommendationItem] error:', error);
        throw error;
    }
}; 