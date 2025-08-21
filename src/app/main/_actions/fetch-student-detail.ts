import { StudentDetail } from '@/app/types/student';
import { studentApiService } from '@/app/lib/api-client';

export async function fetchStudentDetail(studentId: number): Promise<StudentDetail> {
    try {
        const data = await studentApiService.get<StudentDetail>(`api/v1/students/${studentId}`);
        return data;
    } catch (error) {
        console.error('[fetchStudentDetail] error:', error);
        throw error;
    }
} 