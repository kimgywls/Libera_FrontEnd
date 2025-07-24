import { useQuery } from '@tanstack/react-query';

import { ExtracurricularSummary } from '@/app/types/extracurricular';

import { fetchExtracurricularSummary } from '../_actions/fetch-extracurricular-summary';

export function useExtracurricularSummary(studentId: number) {
    const {
        data,
        isLoading,
        isError,
    } = useQuery<ExtracurricularSummary>({
        queryKey: ['extracurricular-summary', studentId],
        queryFn: async () => {
            const result = await fetchExtracurricularSummary(studentId);
            return result || {
                student_id: studentId,
                total_activities: 0,
                total_hours: 0,
                activities_by_type: {},
                activities: []
            };
        },
        enabled: !!studentId,
    });

    return {
        extracurricularSummary: data,
        isLoading,
        isError
    };
} 