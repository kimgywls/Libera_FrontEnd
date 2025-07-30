import axios from 'axios';

import { API_URL } from '@/app/constants';
import { ScoreForm } from '@/app/types/score';
import { safeParseNumber, convertAchievementDistributionForCreate } from '../_utils/score-form-utils';

const api = axios.create({ baseURL: API_URL });

export async function putBulkScores(studentId: number, scores: ScoreForm[]) {
    try {
        // 데이터 타입 변환
        const transformedScores = scores.map(score => ({
            ...score,
            raw_score: safeParseNumber(score.raw_score),
            subject_average: safeParseNumber(score.subject_average),
            standard_deviation: safeParseNumber(score.standard_deviation),
            credit_hours: safeParseNumber(score.credit_hours),
            student_count: score.student_count ? String(score.student_count) : null,
            achievement_distribution: convertAchievementDistributionForCreate(score.achievement_distribution)
        }));
        
        const response = await api.put(`/api/v1/scores/students/${studentId}/scores/bulk`, transformedScores);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('[디버그] 서버 에러:', error.response?.status);
            console.error('[디버그] 응답 본문:', JSON.stringify(error.response?.data, null, 2));
        }
        throw error;
    }
} 