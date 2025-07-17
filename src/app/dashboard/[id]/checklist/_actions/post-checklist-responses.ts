import axios from 'axios';
import { API_URL } from '@/app/constants';
import type { ChecklistSubmitRequest, ChecklistSubmitResponse } from '@/app/types/checklist';

const api = axios.create({ baseURL: API_URL });

export async function postChecklistResponses(body: ChecklistSubmitRequest): Promise<ChecklistSubmitResponse> {
    //console.log('[postChecklistResponses] 요청 바디:', JSON.stringify(body, null, 2));
    try {
        const res = await api.post('/api/v1/checklist/responses', body);
        //console.log('[postChecklistResponses] 응답:', res.data);
        return res.data;
    } catch (error) {
        //console.error('[postChecklistResponses] 에러:', error);
        if (axios.isAxiosError(error)) {
            console.error('[postChecklistResponses] 서버 응답:', error.response?.data);
        }
        throw error;
    }
} 