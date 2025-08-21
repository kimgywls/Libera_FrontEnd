import { scoreApiService } from '@/app/lib/api-client';
import type { CreateScoreRequest } from '@/app/types/score';

export async function createScore(studentId: number, score: CreateScoreRequest) {
    try {
        const response = await scoreApiService.post(`api/v1/scores/students/${studentId}/scores`, score);
        return response;
    } catch (error) {
        console.error('[createScore] error:', error);
        throw error;
    }
}