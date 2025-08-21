import { scoreApiService } from '@/app/lib/api-client';
import { SemesterTrendResponse } from '@/app/types/semesterTrend';

export async function fetchSemesterTrend(studentId: number): Promise<SemesterTrendResponse> {
    try {
        const data = await scoreApiService.get<{ success: boolean; message: string; data: SemesterTrendResponse }>(`api/v1/scores/students/${studentId}/semester-trend`);
        return data.data;
    } catch (error) {
        console.error('[fetchSemesterTrend] error:', error);
        throw error;
    }
} 