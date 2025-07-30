import axios from 'axios';
import { API_URL } from '@/app/constants';

const api = axios.create({
    baseURL: API_URL,
});

interface UpdateOverallEvaluationParams {
    studentId: string;
    overallEvaluation: string;
}

export const updateOverallEvaluation = async ({
    studentId,
    overallEvaluation
}: UpdateOverallEvaluationParams) => {
    const response = await api.put(`/api/v1/checklist/overall-evaluation/${studentId}`, {
        overall_content: overallEvaluation
    });
    return response.data;
}; 