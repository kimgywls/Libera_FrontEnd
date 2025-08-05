import axios from 'axios';

import { API_URL } from '@/app/constants';
import type { UniversityItem } from '@/app/types/university';

const api = axios.create({ baseURL: API_URL });

export interface HideUniversitiesResponse {
    success: boolean;
    message?: string;
    hidden_count?: number;
    actually_hidden?: number;
    requested_count?: number;
    valid_count?: number;
}

export const hideUniversities = async (studentId: number, admissionIds: number[]): Promise<HideUniversitiesResponse> => {
    try {
        const response = await api.post<HideUniversitiesResponse>(
            `/api/v1/school-recommendations/${studentId}/hide-schools`,
            admissionIds,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                timeout: 10000,
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverError = error.response?.data?.detail || error.response?.data?.message || '서버 오류가 발생했습니다';

            if (error.response?.status === 500) {
                const customError = new Error(`학교 숨기기 시스템에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요. (오류: ${serverError})`);
                customError.name = 'HideUniversitiesError';
                throw customError;
            }

            const customError = new Error(`학교 숨기기 실패: ${serverError}`);
            customError.name = 'HideUniversitiesError';
            throw customError;
        }
        throw new Error('네트워크 오류가 발생했습니다');
    }
};

export const unhideUniversities = async (studentId: number, admissionIds: number[]): Promise<HideUniversitiesResponse> => {
    try {
        const response = await api.post<HideUniversitiesResponse>(
            `/api/v1/school-recommendations/${studentId}/unhide-schools`,
            admissionIds,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                timeout: 10000,
            }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverError = error.response?.data?.detail || error.response?.data?.message || '서버 오류가 발생했습니다';

            if (error.response?.status === 500) {
                const customError = new Error(`학교 숨김 해제 시스템에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요. (오류: ${serverError})`);
                customError.name = 'UnhideUniversitiesError';
                throw customError;
            }

            const customError = new Error(`학교 숨김 해제 실패: ${serverError}`);
            customError.name = 'UnhideUniversitiesError';
            throw customError;
        }
        throw new Error('네트워크 오류가 발생했습니다');
    }
};

export const fetchHiddenUniversities = async (studentId: number): Promise<UniversityItem[]> => {
    try {
        const response = await api.get<{
            student_id: number;
            hidden_schools: UniversityItem[];
            total_count: number;
        }>(
            `/api/v1/school-recommendations/hidden/${studentId}`,
            {
                headers: {
                    'Accept': 'application/json',
                },
                timeout: 10000,
            }
        );

        return response.data.hidden_schools || [];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverError = error.response?.data?.detail || error.response?.data?.message || '서버 오류가 발생했습니다';

            if (error.response?.status === 500) {
                const customError = new Error(`숨긴 학교 조회 시스템에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요. (오류: ${serverError})`);
                customError.name = 'FetchHiddenUniversitiesError';
                throw customError;
            }

            const customError = new Error(`숨긴 학교 조회 실패: ${serverError}`);
            customError.name = 'FetchHiddenUniversitiesError';
            throw customError;
        }
        throw new Error('네트워크 오류가 발생했습니다');
    }
}; 