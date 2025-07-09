import axios from 'axios';
import { StudentsListParams, StudentsListResponse } from '@/app/types/student';
import { API_URL } from '@/app/constants';

const api = axios.create({
    baseURL: API_URL,
});

export async function fetchStudents(params: StudentsListParams): Promise<StudentsListResponse> {
    const { data } = await api.get<StudentsListResponse>('api/v1/students', { params });
    //console.log('fetchStudents data:', data);
    return data;
}

export async function fetchStudentByPhone(phone_number: number | string) {
    const { data } = await api.get('api/v1/students', {
        params: { phone_number, limit: 1 }
    });
    if (!data || !Array.isArray(data.students)) {
        console.error('[fetchStudentByPhone] Invalid response:', data);
        return null;
    }
    const result = data.students[0] ?? null;
    //console.log('[fetchStudentByPhone] result:', result);
    return result;
}