import axios from 'axios';
import { API_URL } from '@/app/constants';
import { DesiredSchool } from '@/app/types/university';

const api = axios.create({
    baseURL: API_URL,
});

export interface AddDesiredSchoolParams {
    school_name: string;
    department_name: string;
    priority: number;
    student_id: number;
}

export async function addDesiredSchool(params: AddDesiredSchoolParams) {
    const response = await api.post(`/api/v1/desired-schools/`, params);
    return response.data;
}

export async function deleteDesiredSchool(desired_school_id: number) {
    const response = await api.delete(`/api/v1/desired-schools/${desired_school_id}`);
    return response.data;
}

export async function fetchDesiredSchools(studentId: number): Promise<DesiredSchool[]> {
    try {
        const { data }: { data: DesiredSchool[] } = await api.get(`/api/v1/desired-schools/student/${studentId}`);
        //console.log('[fetchDesiredSchools] response:', data);
        return data;
    } catch (error) {
        console.error('[fetchDesiredSchools] error:', error);
        throw error;
    }
} 