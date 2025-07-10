import { useQuery } from '@tanstack/react-query';
import { fetchAttendance } from '../_actions/fetch-attendance';
import { AttendanceApiResponse } from '@/app/types/attendance';

export function useAttendance(studentId: number) {
    const {
        data,
        error,
        isLoading,
        isError,
    } = useQuery<AttendanceApiResponse>({
        queryKey: ['attendance', studentId],
        queryFn: () => fetchAttendance(studentId),
        enabled: !!studentId,
    });
    return { attendance: data, isLoading, isError };
} 