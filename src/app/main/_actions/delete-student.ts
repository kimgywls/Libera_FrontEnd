import { DeleteStudentResponse } from '@/app/types/student';
import { ApiDeleteResponse } from '@/app/types/common';
import { studentApiService } from '@/app/lib/api-client';

export async function deleteStudents(studentIds: number[]): Promise<DeleteStudentResponse> {
    try {
        const data = await studentApiService.deleteStudents(studentIds) as ApiDeleteResponse;
        console.log('[deleteStudents] API 응답:', data);

        // API 응답을 내부 타입으로 변환
        const response: DeleteStudentResponse = {
            success: data.success,
            message: data.message
        };

        console.log('[deleteStudents] 변환된 응답:', response);
        return response;
    } catch (error) {
        console.error('[deleteStudents] error:', error);
        throw error;
    }
}

export async function deleteStudent(studentId: number): Promise<DeleteStudentResponse> {
    try {
        const data = await studentApiService.deleteStudent(studentId) as ApiDeleteResponse;

        // API 응답을 내부 타입으로 변환
        const response: DeleteStudentResponse = {
            success: data.success,
            message: data.message
        };

        console.log('[deleteStudent] 변환된 응답:', response);
        return response;
    } catch (error) {
        console.error('[deleteStudent] error:', error);
        throw error;
    }
} 