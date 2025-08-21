import { checklistApiService } from '@/app/lib/api-client';
import type { ChecklistResultResponse } from '@/app/types/checklist';

export async function getChecklistResult(studentId: number): Promise<ChecklistResultResponse> {
    try {
        const res = await checklistApiService.get<ChecklistResultResponse>(`/api/v1/checklist/result/${studentId}`);
        return res;
    } catch (error) {
        console.error('[getChecklistResult] error:', error);
        throw error;
    }
} 