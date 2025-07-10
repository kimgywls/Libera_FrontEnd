import { useQuery } from '@tanstack/react-query';
import { fetchStudentScores } from '../_actions/fetch-student-scores';
import { ScoresResponse } from '@/app/types/score';

export function useStudentScores(studentId: number) {
    const {
        data,
        error,
        isLoading,
        isError,
    } = useQuery<ScoresResponse>({
        queryKey: ['student-scores', studentId],
        queryFn: () => fetchStudentScores(studentId),
        enabled: !!studentId,
    });
    return { scores: data, isLoading, isError };
} 