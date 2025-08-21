import { scoreApiService } from '@/app/lib/api-client';
import { ScoreForm } from '@/app/types/score';

// 단일 성적 업데이트 시 사용할 수 있는 필드들
interface SingleScoreUpdateRequest {
    achievement_level?: string | null;
    raw_score?: number | null;
    subject_average?: number | null;
    standard_deviation?: number | null;
    student_count?: number | null;
    grade_rank?: string | null;
    credit_hours?: number | null;
}

export async function putSingleScore(studentId: number, scoreId: number, score: ScoreForm) {
    try {
        // API 스펙에 맞는 필드들만 추출
        const updateData: SingleScoreUpdateRequest = {
            achievement_level: score.achievement_level,
            raw_score: score.raw_score,
            subject_average: score.subject_average,
            standard_deviation: score.standard_deviation,
            student_count: score.student_count ? parseInt(score.student_count) : null,
            grade_rank: score.grade_rank,
            credit_hours: score.credit_hours,
        };

        const response = await scoreApiService.put(`api/v1/scores/students/${studentId}/scores/${scoreId}`, updateData);
        return response;
    } catch (error) {
        console.error('[putSingleScore] error:', error);
        throw error;
    }
} 