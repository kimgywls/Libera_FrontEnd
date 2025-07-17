import axios from 'axios';
import { ScoreForm } from '@/app/types/score';
import { API_URL } from '@/app/constants';

const api = axios.create({ baseURL: API_URL });

export async function putBulkScores(studentId: number, scores: ScoreForm[]) {
    try {
        const response = await api.put(`/api/v1/scores/students/${studentId}/scores/bulk`, scores);
        //console.log('[디버그] putBulkScores 응답', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('[디버그] 서버 에러:', error.response?.status);
            console.error('[디버그] 응답 본문:', JSON.stringify(error.response?.data, null, 2));
        }
        throw error;
    }
} 