import { useQuery } from '@tanstack/react-query';

import { StudentDetail } from '@/app/types/student';
import { fetchStudentDetail } from '../_actions/fetch-student-detail';

export function useStudentList(student_id: number) {
    const { data, error, isLoading, refetch } = useQuery<StudentDetail>({
        queryKey: ['student', student_id],
        queryFn: () => fetchStudentDetail(student_id),
        staleTime: 5 * 60 * 1000, // 5분
        refetchOnWindowFocus: false,
    });

    return {
        student: data ?? null,
        isLoading,
        isError: !!error,
        mutate: refetch,
    };
}
