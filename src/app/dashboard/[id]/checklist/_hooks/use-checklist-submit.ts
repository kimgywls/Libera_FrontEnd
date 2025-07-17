import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postChecklistResponses } from '../_actions/post-checklist-responses';
import type { ChecklistSubmitResponse } from '@/app/types/checklist';

export function useChecklistSubmit() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postChecklistResponses,
        onSuccess: (data: ChecklistSubmitResponse, variables) => {
            // checklist-responses 쿼리 캐시 갱신
            if (variables?.student_id) {
                queryClient.setQueryData<ChecklistSubmitResponse>(['checklist-responses', variables.student_id], (prev) => ({
                    ...(prev || {}),
                    student_id: variables.student_id,
                    responses: data.responses,
                    result_scores: data.result_scores,
                }));
                // checklist-result 쿼리 캐시 갱신
                queryClient.setQueryData<Partial<ChecklistSubmitResponse>>(['checklist-result', variables.student_id], (prev) => ({
                    ...(prev || {}),
                    student_id: variables.student_id,
                    result_scores: data.result_scores,
                }));
            }
        },
        onError: (error: Error) => {
            console.error('Error submitting checklist:', error);
        },
    });
}
