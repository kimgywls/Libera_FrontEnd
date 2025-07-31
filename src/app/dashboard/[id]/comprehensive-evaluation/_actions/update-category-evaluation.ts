import axios from 'axios';
import { API_URL } from '@/app/constants';
import { UpdateCategoryEvaluationParams } from '@/app/types/comprehensiveEvaluation';

const api = axios.create({
    baseURL: API_URL,
});

export const updateCategoryEvaluation = async ({
    studentId,
    mainCategoryId,
    evaluationContent,
    isFinal = false
}: UpdateCategoryEvaluationParams) => {
    const response = await api.put(
        `/api/v1/checklist/student-evaluation/${studentId}/${mainCategoryId}`,
        {
            evaluation_content: evaluationContent,
            is_final: isFinal
        }
    );

    return response.data;
}; 