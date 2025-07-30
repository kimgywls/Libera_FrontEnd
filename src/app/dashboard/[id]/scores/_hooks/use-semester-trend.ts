import { useQuery } from '@tanstack/react-query';
import { fetchSemesterTrend } from '../_actions/fetch-semester-trend';
import { SemesterTrendResponse } from '@/app/types/semesterTrend';

export function useSemesterTrend(studentId: number) {
    const {
        data,
        isLoading,
        isError,
        refetch
    } = useQuery<SemesterTrendResponse>({
        queryKey: ['semester-trend', studentId],
        queryFn: () => fetchSemesterTrend(studentId),
        enabled: !!studentId,
    });
    return { semesterTrend: data, isLoading, isError, refetch };
} 