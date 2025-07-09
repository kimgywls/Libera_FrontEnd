import { API_URL } from '@/app/constants';
import { StudentsListResponse } from '@/app/types/student';
import axios from 'axios';

const api = axios.create({
    baseURL: API_URL,
});

export async function fetchAllStudents(): Promise<StudentsListResponse> {
    const { data } = await api.get<StudentsListResponse>('api/v1/students');
    return data;
} 