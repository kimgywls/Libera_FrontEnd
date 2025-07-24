import { useQuery } from '@tanstack/react-query';

import type { SchoolRecommendationResponse } from '@/app/types/university';

import { fetchSchoolRecommendations } from '../_actions/fetch-school-recommendations';

export const useSchoolRecommendations = (studentId: number) => {
    return useQuery<SchoolRecommendationResponse>({
        queryKey: ['school-recommendations', studentId],
        queryFn: () => fetchSchoolRecommendations(studentId),
        enabled: !!studentId,
    });
}; 