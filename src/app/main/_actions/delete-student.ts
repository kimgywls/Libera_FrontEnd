import { DeleteStudentResponse } from '@/app/types/student';
import { studentApiService } from '@/app/lib/api-client';

export interface DeleteStudentRequest {
    studentIds: number[];
}

export async function deleteStudent(request: DeleteStudentRequest): Promise<DeleteStudentResponse> {
    try {
        const data = await studentApiService.delete<DeleteStudentResponse>('api/v1/students/', { data: request });
        return data;
    } catch (error) {
        console.error('[deleteStudent] error:', error);
        throw error;
    }
} 