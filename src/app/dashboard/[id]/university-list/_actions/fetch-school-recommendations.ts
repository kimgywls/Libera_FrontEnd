import { universityApiService } from '@/app/lib/api-client';
import type { SchoolRecommendationResponse } from '@/app/types/university';

export const fetchSchoolRecommendations = async (
    studentId: number
): Promise<SchoolRecommendationResponse> => {
    try {
        const data = await universityApiService.get<SchoolRecommendationResponse>(`/api/v1/school-recommendations/${studentId}/by-desired-departments`);
        return data;
    } catch (error) {
        console.error('[fetchSchoolRecommendations] error:', error);
        throw error;
    }
}; 