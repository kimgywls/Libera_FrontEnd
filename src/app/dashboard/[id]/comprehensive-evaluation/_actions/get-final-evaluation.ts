import axios from 'axios';

import { API_URL } from '@/app/constants';
import { FinalEvaluationResponse } from '@/app/types/comprehensiveEvaluation';

const api = axios.create({
    baseURL: API_URL,
});

export const getFinalEvaluation = async (studentId: number): Promise<FinalEvaluationResponse> => {
    const response = await api.get(`/api/v1/checklist/final-evaluation/${studentId}`, {
    });

    return response.data;
}; 