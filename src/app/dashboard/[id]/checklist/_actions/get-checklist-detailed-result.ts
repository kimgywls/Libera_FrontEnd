import { checklistApiService } from '@/app/lib/api-client';
import { ChecklistDetailedResultResponse } from '@/app/types/checklist';

export async function getChecklistDetailedResult(studentId: number): Promise<ChecklistDetailedResultResponse> {
    try {
        const res = await checklistApiService.get<ChecklistDetailedResultResponse>(`/api/v1/checklist/detailed-result/${studentId}`);
        return res;
    } catch (error) {
        console.error('[getChecklistDetailedResult] error:', error);
        throw error;
    }
} 