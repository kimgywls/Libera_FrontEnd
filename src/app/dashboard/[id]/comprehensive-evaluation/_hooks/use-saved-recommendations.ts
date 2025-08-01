import { useQuery } from '@tanstack/react-query';

import type { GetRecommendationsParams, GetRecommendationsResponse } from '@/app/types/university';
import { getSavedRecommendations } from '../_actions/get-saved-recommendations';

export const useSavedRecommendations = (params: GetRecommendationsParams) => {
    return useQuery<GetRecommendationsResponse>({
        queryKey: ['saved-recommendations', params.student_id, params.rec_status],
        queryFn: () => getSavedRecommendations(params),
        enabled: !!params.student_id,
        staleTime: 5 * 60 * 1000, // 5분
        refetchOnWindowFocus: false,
    });
}; 