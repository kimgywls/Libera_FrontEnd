import { useQuery } from '@tanstack/react-query';
import { fetchDesiredSchools } from '../_actions/desired-school';
import { DesiredSchool } from '@/app/types/university';

export function useDesiredSchools(studentId: number | undefined) {
    return useQuery<DesiredSchool[]>({
        queryKey: ['desired-schools', studentId],
        queryFn: () => fetchDesiredSchools(studentId!),
        enabled: !!studentId,
    });
} 