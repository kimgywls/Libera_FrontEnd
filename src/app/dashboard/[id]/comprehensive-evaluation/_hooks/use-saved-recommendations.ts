import { useQuery } from '@tanstack/react-query';

import type { GetRecommendationsParams, GetRecommendationsResponse } from '@/app/types/university';
import { getSavedRecommendations } from '../_actions/get-saved-recommendations';

export const useSavedRecommendations = (params: GetRecommendationsParams) => {
    return useQuery<GetRecommendationsResponse>({
        queryKey: ['saved-recommendations', params.student_id, params.rec_status],
        queryFn: () => getSavedRecommendations(params),
        enabled: !!params.student_id,
        staleTime: 0, // 체크리스트 점수 변경 시 즉시 업데이트
        refetchOnWindowFocus: false,
        // 체크리스트 점수 변경 시 자동으로 refetch
        refetchOnMount: true,
    });
}; 