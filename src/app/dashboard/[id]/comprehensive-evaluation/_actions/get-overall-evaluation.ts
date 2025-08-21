import { checklistApiService } from '@/app/lib/api-client';
import { OverallEvaluationResponse } from '@/app/types/comprehensiveEvaluation';

export const getOverallEvaluation = async (studentId: number): Promise<OverallEvaluationResponse> => {
    try {
        const response = await checklistApiService.get<OverallEvaluationResponse>(`/api/v1/checklist/overall-evaluation/${studentId}`);
        return response;
    } catch (error) {
        console.error('[getOverallEvaluation] error:', error);
        throw error;
    }
}; 