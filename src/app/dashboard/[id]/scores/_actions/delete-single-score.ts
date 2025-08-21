import { scoreApiService } from '@/app/lib/api-client';

export async function deleteSingleScore(studentId: number, scoreId: number) {
    try {
        const response = await scoreApiService.delete(`api/v1/scores/students/${studentId}/scores/${scoreId}`);
        return response;
    } catch (error) {
        console.error('[deleteSingleScore] error:', error);
        throw error;
    }
} 