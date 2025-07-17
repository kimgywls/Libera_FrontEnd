import axios from 'axios';
import { API_URL } from '@/app/constants';

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
    console.log("addDesiredSchool params", params);
    const response = await api.post(`/api/v1/desired-schools/`, params);
    console.log("addDesiredSchool", response);
    return response.data;
}

export async function deleteDesiredSchool(desired_school_id: number) {
    const response = await api.delete(`/api/v1/desired-schools/${desired_school_id}`);
    console.log("deleteDesiredSchool", response);
    return response.data;
} 