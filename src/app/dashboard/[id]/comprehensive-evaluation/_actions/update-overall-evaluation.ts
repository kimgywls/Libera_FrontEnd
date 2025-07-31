import axios from 'axios';
import { API_URL } from '@/app/constants';
import { UpdateOverallEvaluationParams } from '@/app/types/comprehensiveEvaluation';

const api = axios.create({
    baseURL: API_URL,
});

export const updateOverallEvaluation = async ({
    studentId,
    overallEvaluation
}: UpdateOverallEvaluationParams) => {
    const response = await api.put(`/api/v1/checklist/overall-evaluation/${studentId}`, {
        overall_content: overallEvaluation
    });
    return response.data;
}; 