import axios from 'axios';
import { API_URL } from '@/app/constants';
import { SemesterTrendResponse } from '@/app/types/semesterTrend';

const api = axios.create({ baseURL: API_URL });

export async function fetchSemesterTrend(studentId: number): Promise<SemesterTrendResponse> {
    try {
        //console.log('[fetchSemesterTrend] studentId:', studentId);
        const { data }: { data: { success: boolean; message: string; data: SemesterTrendResponse } } = await api.get(`/api/v1/scores/students/${studentId}/semester-trend`);
        //console.log('[fetchSemesterTrend] response:', data);
        return data.data;
    } catch (error) {
        console.error('[fetchSemesterTrend] error:', error);
        throw error;
    }
} 