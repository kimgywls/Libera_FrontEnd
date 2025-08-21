import { checklistApiService } from '@/app/lib/api-client';
import type { ChecklistSubmitRequest, ChecklistSubmitResponse } from '@/app/types/checklist';

export async function postChecklistResponses(body: ChecklistSubmitRequest): Promise<ChecklistSubmitResponse> {
    try {
        const res = await checklistApiService.post<ChecklistSubmitResponse>('/api/v1/checklist/responses', body);
        return res;
    } catch (error) {
        console.error('[postChecklistResponses] error:', error);
        throw error;
    }
} 