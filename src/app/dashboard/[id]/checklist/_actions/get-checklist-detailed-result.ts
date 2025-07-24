import axios from 'axios';
import { API_URL } from '@/app/constants';
import { ChecklistDetailedResultResponse } from '@/app/types/checklist';

const api = axios.create({ baseURL: API_URL });

export async function getChecklistDetailedResult(studentId: number): Promise<ChecklistDetailedResultResponse> {
    const res = await api.get(`/api/v1/checklist/detailed-result/${studentId}`);
    return res.data;
} 