import { useQuery } from '@tanstack/react-query';

import { AttendanceApiResponse } from '@/app/types/attendance';

import { fetchAttendance } from '../_actions/fetch-attendance';

export function useAttendance(studentId: number) {
    const {
        data,
        isLoading,
        isError,
    } = useQuery<AttendanceApiResponse>({
        queryKey: ['attendance', studentId],
        queryFn: () => fetchAttendance(studentId),
        enabled: !!studentId,
    });
    return { attendance: data, isLoading, isError };
} 