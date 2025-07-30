import axios from 'axios';
import { API_URL } from '@/app/constants';

const api = axios.create({
    baseURL: API_URL,
});

interface UpdateCategoryEvaluationParams {
    studentId: number;
    mainCategoryId: number;
    evaluationContent: string;
    isFinal?: boolean;
}

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