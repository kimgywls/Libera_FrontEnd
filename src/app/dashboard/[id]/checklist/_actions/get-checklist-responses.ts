import axios from 'axios';
import { API_URL } from '@/app/constants';
import type { ChecklistSubmitResponse } from '@/app/types/checklist';

const api = axios.create({ baseURL: API_URL });

export async function getChecklistResponses(studentId: number): Promise<ChecklistSubmitResponse> {
    const res = await api.get(`/api/v1/checklist/responses/${studentId}`);
    return res.data;
} 