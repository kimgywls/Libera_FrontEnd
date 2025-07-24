import axios from 'axios';
import { API_URL } from '@/app/constants';
import { StudentDetail } from '@/app/types/student';

const api = axios.create({
    baseURL: API_URL,
});

export async function fetchStudentDetail(studentId: number): Promise<StudentDetail> {
    try {
        const { data } = await api.get<StudentDetail>(`api/v1/students/${studentId}`);
        return data;
    } catch (error) {
        console.error('[fetchStudentDetail] error:', error);
        if (axios.isAxiosError(error)) {
            console.error('[fetchStudentDetail] status:', error.response?.status);
            console.error('[fetchStudentDetail] data:', error.response?.data);
        }
        throw error;
    }
} 