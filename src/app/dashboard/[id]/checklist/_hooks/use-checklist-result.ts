import { useQuery } from '@tanstack/react-query';
import { getChecklistResult } from '../_actions/get-checklist-result';
import type { ChecklistResultResponse } from '@/app/types/checklist';

export function useChecklistResult(studentId: number) {
    return useQuery<ChecklistResultResponse>({
        queryKey: ['checklist-result', studentId],
        queryFn: () => getChecklistResult(studentId),
        enabled: !!studentId,
    });
} 