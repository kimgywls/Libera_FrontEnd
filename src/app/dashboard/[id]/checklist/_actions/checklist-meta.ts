import axios from 'axios';
import { API_URL } from '@/app/constants';
import type { AxiosError } from 'axios';
import type { SaveChecklistMetaRequest, ChecklistMetaResponse } from '@/app/types/checklist';

const api = axios.create({
    baseURL: API_URL,
});


export async function saveChecklistMeta(body: SaveChecklistMetaRequest): Promise<{ success: boolean; message?: string; }> {
    try {
        // [디버깅] 요청 body 출력
        //console.log('[saveChecklistMeta] 요청 body:', body);
        const res = await api.post('/api/v1/checklist/meta', body);
        // [디버깅] 응답 데이터 출력
        //console.log('[saveChecklistMeta] 응답 데이터:', res.data);
        return { success: true, message: res.data?.message || '저장 성공' };
    } catch (error) {
        // [디버깅] 에러 전체 객체 출력
        //console.log('[saveChecklistMeta] 에러:', error);
        const err = error as AxiosError<any>;
        // [디버깅] 에러 응답 데이터 출력
        //console.log('[saveChecklistMeta] 에러 응답 데이터:', err.response?.data);
        let message = '저장 실패';
        const data = err.response?.data;
        if (data) {
            // 422 Validation Error 상세 메시지 파싱
            if (Array.isArray(data.detail)) {
                message = data.detail.map((d: any) => d.msg).join(', ');
            } else if (typeof data.message === 'string') {
                message = data.message;
            }
        }
        return { success: false, message };
    }
}

export async function fetchChecklistMeta(student_id: number): Promise<ChecklistMetaResponse | null> {
    try {
        const res = await api.get(`/api/v1/checklist/meta/${student_id}`);
        return res.data;
    } catch {
        return null;
    }
} 