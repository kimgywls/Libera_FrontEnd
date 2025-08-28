import { ScoresResponse } from '@/app/types/score';
import { scoreApiService } from '@/app/lib/api-client';

export async function fetchStudentScores(studentId: number): Promise<ScoresResponse> {
    try {
        const data = await scoreApiService.get<{ success: boolean; message: string; data: ScoresResponse }>(`api/v1/scores/students/${studentId}`);
        return data.data;
    } catch (error) {
        console.error('[fetchStudentScores] error:', error);
        throw error;
    }
} 