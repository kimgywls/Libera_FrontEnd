import { checklistApiService } from '@/app/lib/api-client';
import type { ChecklistQuestionsResponse, ChecklistQuestion } from '@/app/types/checklist';

export async function fetchChecklistQuestions(): Promise<ChecklistQuestionsResponse> {
    try {
        const res = await checklistApiService.get<ChecklistQuestion[] | ChecklistQuestionsResponse>('/api/v1/checklist/questions');
        // 배열만 올 경우, 객체로 감싸서 반환
        if (Array.isArray(res)) {
            return { questions: res };
        }
        return res as ChecklistQuestionsResponse;
    } catch (error) {
        console.error('[fetchChecklistQuestions] error:', error);
        throw error;
    }
} 