import { checklistApiService } from '@/app/lib/api-client';
import type { ChecklistSubmitResponse } from '@/app/types/checklist';

export async function getChecklistResponses(studentId: number): Promise<ChecklistSubmitResponse> {
    try {
        const res = await checklistApiService.get<ChecklistSubmitResponse>(`/api/v1/checklist/responses/${studentId}`);
        return res;
    } catch (error) {
        console.error('[getChecklistResponses] error:', error);
        throw error;
    }
} 