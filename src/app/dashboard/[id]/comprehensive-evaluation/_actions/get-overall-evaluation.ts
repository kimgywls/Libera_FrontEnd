import axios from 'axios';
import { API_URL } from '@/app/constants';

const api = axios.create({
    baseURL: API_URL,
});

export interface OverallEvaluationResponse {
    student_id: number;
    overall_content: string | null;
    overall_evaluation_id: number;
    created_at: string;
    updated_at: string;
}

export const getOverallEvaluation = async (studentId: number): Promise<OverallEvaluationResponse> => {
    const response = await api.get(`/api/v1/checklist/overall-evaluation/${studentId}`);
    return response.data;
}; 