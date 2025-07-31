import axios from 'axios';

import { API_URL } from '@/app/constants';
import { DeleteStudentResponse } from '@/app/types/student';

const api = axios.create({ baseURL: API_URL });

export async function deleteStudent(studentIds: number[]): Promise<DeleteStudentResponse> {
    try {
        if (studentIds.length === 1) {
            // 단일 학생 삭제
            await api.delete(`/api/v1/students/${studentIds[0]}`);
        } else {
            // 다중 학생 삭제
            await api.delete('/api/v1/students/bulk', { data: { studentIds } });
        }
        return {
            success: true,
            message: `${studentIds.length}명의 학생이 삭제되었습니다.`
        };
    } catch (err) {
        console.error('[deleteStudent] error:', err);
        if (axios.isAxiosError(err)) {
            console.error('[deleteStudent] status:', err.response?.status);
            console.error('[deleteStudent] data:', err.response?.data);
            const message = err.response?.data?.message || '삭제 중 오류가 발생했습니다';
            return { success: false, message };
        }
        return { success: false, message: '알 수 없는 오류가 발생했습니다' };
    }
} 