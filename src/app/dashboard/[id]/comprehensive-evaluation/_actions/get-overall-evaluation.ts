import axios from 'axios';
import { API_URL } from '@/app/constants';
import { OverallEvaluationResponse } from '@/app/types/comprehensiveEvaluation';

const api = axios.create({
    baseURL: API_URL,
});

export const getOverallEvaluation = async (studentId: number): Promise<OverallEvaluationResponse> => {
    const response = await api.get(`/api/v1/checklist/overall-evaluation/${studentId}`);
    return response.data;
}; 