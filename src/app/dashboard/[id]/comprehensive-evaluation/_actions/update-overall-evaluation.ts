import { checklistApiService } from '@/app/lib/api-client';
import { UpdateOverallEvaluationParams } from '@/app/types/comprehensiveEvaluation';

export const updateOverallEvaluation = async ({
    studentId,
    overallEvaluation
}: UpdateOverallEvaluationParams) => {
    try {
        const response = await checklistApiService.put(`/api/v1/checklist/overall-evaluation/${studentId}`, {
            overall_content: overallEvaluation
        });
        return response;
    } catch (error) {
        console.error('[updateOverallEvaluation] error:', error);
        throw error;
    }
}; 