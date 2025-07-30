import axios from 'axios';
import { ScoreForm } from '@/app/types/score';
import { API_URL } from '@/app/constants';

const api = axios.create({ baseURL: API_URL });

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

        const response = await api.put(`/api/v1/scores/students/${studentId}/scores/${scoreId}`, updateData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('단일 성적 수정 실패:', error.response?.status, error.response?.data);
        }
        throw error;
    }
} 