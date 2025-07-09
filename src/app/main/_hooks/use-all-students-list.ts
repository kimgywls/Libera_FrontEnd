import useSWR from 'swr';
import { fetchAllStudents } from '../_actions/fetch-all-students';
import { StudentsListResponse } from '@/app/types/student';

export function useAllStudentsList() {
    const { data, error, isLoading, mutate } = useSWR<StudentsListResponse>(
        'all-students',
        fetchAllStudents,
        { revalidateOnFocus: false }
    );
    //console.log("all-students", data);
    return {
        students: data?.students ?? [],
        total: data?.total ?? 0,
        isLoading,
        isError: !!error,
        mutate,
    };
} 