import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { saveChecklistMeta, fetchChecklistMeta } from '../_actions/checklist-meta';
import type { SaveChecklistMetaRequest, ChecklistMetaResponse } from '@/app/types/checklist';

export function useChecklistMetaMutation(student_id: number | undefined) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body: SaveChecklistMetaRequest) => saveChecklistMeta(body),
        onSuccess: () => {
            if (student_id) {
                queryClient.invalidateQueries({ queryKey: ['checklistMeta', student_id] });
            }
        },
    });
}

export function useChecklistMetaQuery(student_id: number | undefined) {
    return useQuery<ChecklistMetaResponse | null>({
        queryKey: ['checklistMeta', student_id],
        queryFn: () => (student_id ? fetchChecklistMeta(student_id) : Promise.resolve(null)),
        enabled: !!student_id,
    });
} 