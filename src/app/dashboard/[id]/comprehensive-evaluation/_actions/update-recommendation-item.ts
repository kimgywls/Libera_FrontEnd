import { universityApiService } from '@/app/lib/api-client';

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
        const response = await universityApiService.put(
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
        return response;
    } catch (error) {
        console.error('[updateRecommendationItem] error:', error);
        throw error;
    }
}; 