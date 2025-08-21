import { useQuery } from '@tanstack/react-query';

import { StudentsListResponse } from '@/app/types/student';
import { StudentListParams } from '@/app/types/common';
import { fetchAllStudents } from '../_actions/fetch-all-students';

export function useAllStudentsList(params?: StudentListParams) {
    const { data, error, isLoading, refetch } = useQuery<StudentsListResponse>({
        queryKey: ['all-students', params],
        queryFn: () => fetchAllStudents(params),
        staleTime: 5 * 60 * 1000, // 5분
        refetchOnWindowFocus: false,
    });

    return {
        students: data?.students ?? [],
        total: data?.total ?? 0,
        isLoading,
        isError: !!error,
        mutate: refetch,
    };
} 