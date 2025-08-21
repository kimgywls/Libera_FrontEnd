import { checklistApiService } from '@/app/lib/api-client';
import type { SaveChecklistMetaRequest, ChecklistMetaResponse } from '@/app/types/checklist';

export async function saveChecklistMeta(body: SaveChecklistMetaRequest): Promise<{ success: boolean; message?: string; }> {
    try {
        const res = await checklistApiService.post<{ message?: string }>('/api/v1/checklist/meta', body);
        return { success: true, message: res.message || '저장 성공' };
    } catch (error) {
        console.error('[saveChecklistMeta] error:', error);
        return { success: false, message: '저장 실패' };
    }
}

export async function fetchChecklistMeta(student_id: number): Promise<ChecklistMetaResponse | null> {
    try {
        const res = await checklistApiService.get<ChecklistMetaResponse>(`/api/v1/checklist/meta/${student_id}`);
        return res;
    } catch (error) {
        console.error('[fetchChecklistMeta] error:', error);
        return null;
    }
} 