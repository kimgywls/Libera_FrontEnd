import useSWR from 'swr';
import { fetchSemesterTrend } from '../_actions/fetch-semester-trend';
import { SemesterTrendResponse } from '@/app/types/semesterTrend';

export function useSemesterTrend(studentId: number) {
    const { data, error, isLoading } = useSWR<SemesterTrendResponse>(
        studentId ? ['semester-trend', studentId] : null,
        () => fetchSemesterTrend(studentId)
    );
    return { semesterTrend: data, isLoading, isError: !!error };
} 