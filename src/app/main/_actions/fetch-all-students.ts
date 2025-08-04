import axios from 'axios';

import { API_URL } from '@/app/constants';
import { StudentsListParams, StudentsListResponse } from '@/app/types/student';

const api = axios.create({
    baseURL: API_URL,
});

export async function fetchAllStudents(params?: StudentsListParams): Promise<StudentsListResponse> {
    try {
        const { data } = await api.get<StudentsListResponse>('api/v1/students', {
            params
        });
        return data;
    } catch (error) {
        console.error('[fetchAllStudents] error:', error);
        if (axios.isAxiosError(error)) {
            console.error('[fetchAllStudents] status:', error.response?.status);
            console.error('[fetchAllStudents] data:', error.response?.data);

            // 500 에러인 경우 사용자 친화적인 메시지
            if (error.response?.status === 500) {
                throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            }

            // 기타 HTTP 에러
            const errorMessage = error.response?.data?.detail || error.response?.data?.message || '학생 목록을 불러오는데 실패했습니다.';
            throw new Error(errorMessage);
        }
        throw new Error('학생 목록을 불러오는데 실패했습니다.');
    }
} 