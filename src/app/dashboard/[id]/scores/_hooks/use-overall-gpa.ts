import useSWR from 'swr';
import { fetchOverallGpa, OverallGpaResponse } from '../_actions/fetch-overall-gpa';

export function useOverallGpa(studentId: number) {
    const { data, error, isLoading } = useSWR<OverallGpaResponse>(
        studentId ? [`overall-gpa`, studentId] : null,
        () => fetchOverallGpa(studentId)
    );
    return {
        overallGpa: data?.gpa,
        isLoading,
        isError: !!error,
    };
} 