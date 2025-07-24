import axios from 'axios';

import { API_URL } from '@/app/constants';
import { AttendanceApiResponse } from '@/app/types/attendance';

const api = axios.create({ baseURL: API_URL });

export async function fetchAttendance(studentId: number): Promise<AttendanceApiResponse> {
    try {
        const { data }: { data: AttendanceApiResponse } = await api.get(`/api/v1/attendance/${studentId}`);
        //console.log('[fetchAttendance] response:', data);
        return data;
    } catch (error) {
        console.error('[fetchAttendance] error:', error);
        throw error;
    }
} 