import axios, { AxiosError } from 'axios';

import { API_URL } from '@/app/constants';
import { ExtracurricularSummary, ExtracurricularApiData } from '@/app/types/extracurricular';

const api = axios.create({ baseURL: API_URL });

export async function fetchExtracurricularSummary(studentId: number): Promise<ExtracurricularSummary> {
    try {
        const response = await api.get<ExtracurricularApiData>(`/api/v1/extracurricular/student/${studentId}/summary`);
        const data = response.data;

        if (!data) {
            throw new Error('No data in API response');
        }

        const summary: ExtracurricularSummary = {
            student_id: data.student_id || studentId,
            creative_activities: data.creative_activities?.items || [],
            detailed_abilities: data.detailed_abilities?.items || [],
            behavioral_characteristics: data.behavioral_characteristics?.items || []
        };

        return summary;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('[fetchExtracurricularSummary] Axios error:', {
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data
            });
            throw new Error(`API 요청 실패: ${error.response?.status || 'Network Error'} - ${error.message}`);
        } else if (error instanceof Error) {
            console.error('[fetchExtracurricularSummary] Error:', error.message);
            throw error;
        } else {
            console.error('[fetchExtracurricularSummary] Unknown error:', error);
            throw new Error('알 수 없는 오류가 발생했습니다.');
        }
    }
} 