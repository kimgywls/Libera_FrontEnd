import { studentApiService } from '@/app/lib/api-client';
import { StudentsListResponse } from '@/app/types/student';
import { StudentListParams } from '@/app/types/common';

export async function fetchAllStudents(params?: StudentListParams): Promise<StudentsListResponse> {
    try {
        const data = await studentApiService.get<StudentsListResponse>('api/v1/students', { params });
        return data;
    } catch (error) {
        console.error('[fetchAllStudents] error:', error);
        throw error;
    }
} 