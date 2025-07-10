import useSWR from 'swr';
import { fetchDesiredSchools } from '../_actions/fetch-desired-schools';
import { DesiredSchool } from '@/app/types/school-recommendation';

export function useDesiredSchools(studentId: number | undefined) {
    const { data, error, isLoading } = useSWR<DesiredSchool[]>(
        studentId ? [`desired-schools`, studentId] : null,
        () => fetchDesiredSchools(studentId!)
    );
    //console.log('[useDesiredSchools] data:', data);
    return {
        desiredSchools: data,
        isLoading,
        isError: !!error,
    };
} 