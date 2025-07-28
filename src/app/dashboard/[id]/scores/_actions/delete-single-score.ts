import axios from 'axios';
import { API_URL } from '@/app/constants';

const api = axios.create({ baseURL: API_URL });

export async function deleteSingleScore(studentId: number, scoreId: number) {
    try {
        const response = await api.delete(`/api/v1/scores/students/${studentId}/scores/${scoreId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('단일 성적 삭제 실패:', error.response?.status, error.response?.data);
            throw new Error(`성적 삭제 실패: ${error.response?.status || 'Network Error'} - ${error.message}`);
        } else if (error instanceof Error) {
            console.error('성적 삭제 오류:', error.message);
            throw error;
        } else {
            console.error('알 수 없는 삭제 오류:', error);
            throw new Error('성적 삭제 중 알 수 없는 오류가 발생했습니다.');
        }
    }
} 