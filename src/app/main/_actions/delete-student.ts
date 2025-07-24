import axios from 'axios';

import { API_URL } from '@/app/constants';

const api = axios.create({ baseURL: API_URL });

export interface DeleteStudentResponse {
    success: boolean;
    message: string;
    status?: number;
}

interface ErrorResponse {
    detail?: string;
    message?: string;
}

export async function deleteStudent(studentIds: number[]): Promise<DeleteStudentResponse> {
    try {
        for (const id of studentIds) {
            await api.delete(`/api/v1/students/${id}`);
        }
        return { success: true, message: '삭제 성공', status: 200 };
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const status = err.response?.status;
            let message = '알 수 없는 오류';
            if (status === 404) {
                message = '학생을 찾을 수 없습니다';
            } else if (status === 422) {
                message = 'Validation Error';
            } else if (typeof err.response?.data === 'object') {
                const data = err.response?.data as ErrorResponse;
                message = data.message || data.detail || message;
            } else if (typeof err.response?.data === 'string') {
                message = err.response.data;
            }
            return { success: false, message, status };
        }
        return { success: false, message: '알 수 없는 오류', status: undefined };
    }
} 