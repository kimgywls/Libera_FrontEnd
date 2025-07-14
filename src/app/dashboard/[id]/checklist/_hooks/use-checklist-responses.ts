import { useQuery } from '@tanstack/react-query';
import { getChecklistResponses } from '../_actions/get-checklist-responses';
import type { ChecklistSubmitResponse } from '@/app/types/checklist';

export function useChecklistResponses(studentId: number) {
    return useQuery<ChecklistSubmitResponse>({
        queryKey: ['checklist-responses', studentId],
        queryFn: () => getChecklistResponses(studentId),
        enabled: !!studentId,
    });
} 