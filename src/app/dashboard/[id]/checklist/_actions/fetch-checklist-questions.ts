import axios from 'axios';
import { API_URL } from '@/app/constants';
import type { ChecklistQuestionsResponse } from '@/app/types/checklist';

const api = axios.create({ baseURL: API_URL });

export async function fetchChecklistQuestions(): Promise<ChecklistQuestionsResponse> {
    const res = await api.get('/api/v1/checklist/questions');
    // console.log('[fetchChecklistQuestions] 응답:', res.data);
    // 배열만 올 경우, 객체로 감싸서 반환
    if (Array.isArray(res.data)) {
        return { questions: res.data };
    }
    return res.data;
} 