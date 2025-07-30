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
        }
        throw error;
    }
} 