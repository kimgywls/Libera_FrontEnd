import { useQuery } from '@tanstack/react-query';

import { StudentsListResponse } from '@/app/types/student';

import { fetchAllStudents } from '../_actions/fetch-all-students';

export function useAllStudentsList() {
    const { data, error, isLoading, refetch } = useQuery<StudentsListResponse>({
        queryKey: ['all-students'],
        queryFn: fetchAllStudents,
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