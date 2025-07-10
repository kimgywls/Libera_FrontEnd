import { useQuery } from '@tanstack/react-query';
import { fetchOverallGpa, OverallGpaResponse } from '../_actions/fetch-overall-gpa';

export function useOverallGpa(studentId: number) {
    const {
        data,
        isLoading,
        isError,
    } = useQuery<OverallGpaResponse>({
        queryKey: ['overall-gpa', studentId],
        queryFn: () => fetchOverallGpa(studentId),
        enabled: !!studentId,
    });
    return {
        overallGpa: data?.gpa,
        mainSubjectsGpa: data?.main_subjects_gpa,
        isLoading,
        isError,
    };
} 