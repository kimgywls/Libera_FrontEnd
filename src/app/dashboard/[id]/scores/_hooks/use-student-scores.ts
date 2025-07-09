import useSWR from 'swr';
import { fetchStudentScores } from '../_actions/fetch-student-scores';
import { ScoresResponse } from '@/app/types/score';

export function useStudentScores(studentId: number) {
    const { data, error, isLoading } = useSWR<ScoresResponse>(
        studentId ? ['student-scores', studentId] : null,
        () => fetchStudentScores(studentId)
    );
    return { scores: data, isLoading, isError: !!error };
} 