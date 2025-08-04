import { useQuery } from '@tanstack/react-query';
import { getChecklistResult } from '../../checklist/_actions/get-checklist-result';

export const useChecklistResult = (studentId: number) => {
    return useQuery({
        queryKey: ['checklist-result', studentId],
        queryFn: () => getChecklistResult(studentId),
        enabled: !!studentId,
        staleTime: 5 * 60 * 1000, // 5분
        refetchOnWindowFocus: false,
    });
}; 