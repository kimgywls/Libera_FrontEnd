import { useQuery } from '@tanstack/react-query';

import { ScoresResponse } from '@/app/types/score';

import { fetchStudentScores } from '../_actions/fetch-student-scores';

export function useStudentScores(studentId: number) {
    const {
        data,
        isLoading,
        isError,
    } = useQuery<ScoresResponse>({
        queryKey: ['student-scores', studentId],
        queryFn: () => fetchStudentScores(studentId),
        enabled: !!studentId,
    });
    return { scores: data, isLoading, isError };
} 