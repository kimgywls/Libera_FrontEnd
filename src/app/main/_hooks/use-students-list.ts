import useSWR from 'swr';
import { fetchStudents } from '../_actions/fetch-students';
import { StudentsListParams, StudentsListResponse } from '@/app/types/student';

const fetcher = (params: StudentsListParams) => fetchStudents(params);

export function useStudentsList(params: StudentsListParams) {
    const { data, error, isLoading, mutate } = useSWR<StudentsListResponse>(
        ['students', JSON.stringify(params)],
        () => fetcher(params),
        { revalidateOnFocus: false }
    );
    //console.log('useStudentsList', data);
    return {
        students: data?.students ?? [],
        total: data?.total ?? 0,
        isLoading,
        isError: !!error,
        mutate,
    };
}
