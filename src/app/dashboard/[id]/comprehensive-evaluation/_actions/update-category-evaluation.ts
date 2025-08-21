import { checklistApiService } from '@/app/lib/api-client';
import { UpdateCategoryEvaluationParams } from '@/app/types/comprehensiveEvaluation';

export const updateCategoryEvaluation = async ({
    studentId,
    mainCategoryId,
    evaluationContent,
    isFinal = false
}: UpdateCategoryEvaluationParams) => {
    try {
        const response = await checklistApiService.put(
            `/api/v1/checklist/student-evaluation/${studentId}/${mainCategoryId}`,
            {
                evaluation_content: evaluationContent,
                is_final: isFinal
            }
        );

        return response;
    } catch (error) {
        console.error('[updateCategoryEvaluation] error:', error);
        throw error;
    }
}; 