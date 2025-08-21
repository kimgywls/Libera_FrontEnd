import { universityApiService } from '@/app/lib/api-client';
import type { SaveRecommendationRequest, SaveRecommendationResponse } from '@/app/types/university';

export const saveRecommendations = async (
    data: SaveRecommendationRequest
): Promise<SaveRecommendationResponse> => {
    try {
        const response = await universityApiService.post<SaveRecommendationResponse>(
            '/api/v1/admin/recommendations/',
            data
        );

        return response;
    } catch (error) {
        console.error('[saveRecommendations] error:', error);
        throw error;
    }
}; 