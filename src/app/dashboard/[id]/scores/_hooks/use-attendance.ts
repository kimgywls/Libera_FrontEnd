import useSWR from 'swr';
import { fetchAttendance } from '../_actions/fetch-attendance';
import { AttendanceApiResponse } from '@/app/types/attendance';

export function useAttendance(studentId: number) {
    const { data, error, isLoading } = useSWR<AttendanceApiResponse>(
        studentId ? ['attendance', studentId] : null,
        () => fetchAttendance(studentId)
    );
    //console.log('[useAttendance] studentId:', studentId, 'data:', data);
    return { attendance: data, isLoading, isError: !!error };
} 