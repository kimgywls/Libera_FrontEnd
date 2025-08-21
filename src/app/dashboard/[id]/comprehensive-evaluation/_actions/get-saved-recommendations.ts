import { universityApiService } from '@/app/lib/api-client';
import type { GetRecommendationsParams, GetRecommendationsResponse } from '@/app/types/university';

export const getSavedRecommendations = async (
    params: GetRecommendationsParams
): Promise<GetRecommendationsResponse> => {
    try {
        const { student_id, rec_status } = params;

        const queryParams = new URLSearchParams();
        if (rec_status) {
            queryParams.append('rec_status', rec_status);
        }

        const response = await universityApiService.get<GetRecommendationsResponse>(
            `/api/v1/admin/recommendations/student/${student_id}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
        );

        return response;
    } catch (error) {
        console.error('[getSavedRecommendations] error:', error);
        throw error;
    }
}; 