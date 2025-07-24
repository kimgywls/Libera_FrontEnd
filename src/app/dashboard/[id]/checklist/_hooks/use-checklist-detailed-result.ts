import { useQuery } from '@tanstack/react-query';
import { getChecklistDetailedResult } from '../_actions/get-checklist-detailed-result';
import { ChecklistDetailedResultResponse } from '@/app/types/checklist';

export function useChecklistDetailedResult(studentId: number) {
    return useQuery<ChecklistDetailedResultResponse, Error>({
        queryKey: ['checklist-detailed-result', studentId],
        queryFn: () => getChecklistDetailedResult(studentId),
        enabled: !!studentId,
    });
} 