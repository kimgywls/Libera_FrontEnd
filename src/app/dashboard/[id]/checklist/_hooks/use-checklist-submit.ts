import { useMutation } from '@tanstack/react-query';
import { postChecklistResponses } from '../_actions/post-checklist-responses';
import type { ChecklistSubmitResponse } from '@/app/types/checklist';

export function useChecklistSubmit() {
    return useMutation({
        mutationFn: postChecklistResponses,
        onSuccess: (data: ChecklistSubmitResponse) => {
            //console.log('Checklist submitted successfully:', data);
        },
        onError: (error: Error) => {
            console.error('Error submitting checklist:', error);
        },
    });
}
