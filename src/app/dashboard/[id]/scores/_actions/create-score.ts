import axios from 'axios';
import { API_URL } from '@/app/constants';
import type { CreateScoreRequest } from '@/app/types/score';

const api = axios.create({ baseURL: API_URL });

export async function createScore(studentId: number, score: CreateScoreRequest) {
    try {
        const response = await api.post(`/api/v1/scores/students/${studentId}/scores`, score);
        //console.log('[디버그] createScore 응답', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('[디버그] 서버 에러:', error.response?.status);
            console.error('[디버그] 응답 본문:', JSON.stringify(error.response?.data, null, 2));
        }
        throw error;
    }
}