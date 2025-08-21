import { DesiredSchool } from '@/app/types/university';
import { desiredSchoolApiService } from '@/app/lib/api-client';

export interface AddDesiredSchoolParams {
    school_name: string;
    department_name: string;
    priority: number;
    student_id: number;
}

export async function addDesiredSchool(params: AddDesiredSchoolParams) {
    const response = await desiredSchoolApiService.addDesiredSchool(params);
    return response;
}

export async function deleteDesiredSchool(desired_school_id: number) {
    const response = await desiredSchoolApiService.deleteDesiredSchool(desired_school_id);
    return response;
}

export async function fetchDesiredSchools(studentId: number): Promise<DesiredSchool[]> {
    try {
        const data = await desiredSchoolApiService.get<DesiredSchool[]>(`api/v1/desired-schools/student/${studentId}`);
        return data;
    } catch (error) {
        console.error('[fetchDesiredSchools] error:', error);
        throw error;
    }
} 