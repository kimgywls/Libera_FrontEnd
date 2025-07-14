import axios from 'axios';
import { API_URL } from '@/app/constants';
import type { ChecklistResultResponse } from '@/app/types/checklist';

const api = axios.create({ baseURL: API_URL });

export async function getChecklistResult(studentId: number): Promise<ChecklistResultResponse> {
    const res = await api.get(`/api/v1/checklist/result/${studentId}`);
    return res.data;
} 