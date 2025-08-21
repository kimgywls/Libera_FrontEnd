import { checklistApiService } from '@/app/lib/api-client';
import { FinalEvaluationResponse } from '@/app/types/comprehensiveEvaluation';

export const getFinalEvaluation = async (studentId: number): Promise<FinalEvaluationResponse> => {
    try {
        const response = await checklistApiService.get<FinalEvaluationResponse>(`/api/v1/checklist/final-evaluation/${studentId}`);
        return response;
    } catch (error) {
        console.error('[getFinalEvaluation] error:', error);
        throw error;
    }
}; 