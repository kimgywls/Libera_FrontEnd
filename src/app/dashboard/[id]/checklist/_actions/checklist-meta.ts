import axios from 'axios';
import { API_URL } from '@/app/constants';
import type { AxiosError } from 'axios';
import type { SaveChecklistMetaRequest, ChecklistMetaResponse } from '@/app/types/checklist';

const api = axios.create({
    baseURL: API_URL,
});

// 에러 응답 타입 정의
interface ChecklistMetaErrorResponse {
    detail?: { msg: string }[];
    message?: string;
}

export async function saveChecklistMeta(body: SaveChecklistMetaRequest): Promise<{ success: boolean; message?: string; }> {
    try {
        const res = await api.post('/api/v1/checklist/meta', body);
        return { success: true, message: res.data?.message || '저장 성공' };
    } catch (error) {
        const err = error as AxiosError<ChecklistMetaErrorResponse>;
        let message = '저장 실패';
        const data = err.response?.data;
        if (data) {
            // 422 Validation Error 상세 메시지 파싱
            if (Array.isArray(data.detail)) {
                message = data.detail.map((d) => d.msg).join(', ');
            } else if (typeof data.message === 'string') {
                message = data.message;
            }
        }
        console.error('체크리스트 메타 저장 실패:', message);
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