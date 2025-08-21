import { attendanceApiService } from '@/app/lib/api-client';
import { AttendanceApiResponse } from '@/app/types/attendance';

export async function fetchAttendance(studentId: number): Promise<AttendanceApiResponse> {
    try {
        const data = await attendanceApiService.get<AttendanceApiResponse>(`api/v1/attendance/${studentId}`);
        return data;
    } catch (error) {
        console.error('[fetchAttendance] error:', error);
        throw error;
    }
} 