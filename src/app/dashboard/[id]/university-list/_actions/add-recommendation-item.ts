import { universityApiService } from '@/app/lib/api-client';
import type { SaveRecommendationResponse, AddRecommendationItemRequest } from '@/app/types/university';

export const addRecommendationItem = async (
    recommendationId: number,
    data: AddRecommendationItemRequest
): Promise<SaveRecommendationResponse> => {
    try {
        const response = await universityApiService.post<SaveRecommendationResponse>(
            `/api/v1/admin/recommendations/${recommendationId}/items`,
            data
        );

        return response;
    } catch (error) {
        console.error('[addRecommendationItem] error:', error);
        throw error;
    }
}; 