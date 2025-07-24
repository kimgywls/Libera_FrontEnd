import axios, { AxiosError } from 'axios';

import { API_URL } from '@/app/constants';
import type { UniversityItem } from '@/app/types/university';

const api = axios.create({ baseURL: API_URL });

export interface HideUniversitiesRequest {
    student_id: number;
    admission_ids: number[];
}

export interface HideUniversitiesResponse {
    success: boolean;
    message?: string;
}

export async function hideUniversities(
    studentId: number,
    admissionIds: number[]
): Promise<HideUniversitiesResponse> {
    const body: HideUniversitiesRequest = {
        student_id: studentId,
        admission_ids: admissionIds,
    };
    try {
        // console.log('[hideUniversities] request body:', body);
        const res = await api.post<HideUniversitiesResponse>(
            '/api/v1/school-recommendations/hide',
            body
        );
        // console.log('[hideUniversities] response:', res.data);
        return {
            ...res.data,
            success: true,
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('[hideUniversities] Axios error:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data
            });
            return {
                success: false,
                message: error.response?.data?.message || `서버 오류: ${error.response?.status || 'Network Error'}`,
            };
        } else if (error instanceof Error) {
            console.error('[hideUniversities] Error:', error.message);
            return {
                success: false,
                message: `오류: ${error.message}`,
            };
        } else {
            console.error('[hideUniversities] Unknown error:', error);
            return {
                success: false,
                message: '알 수 없는 오류가 발생했습니다.',
            };
        }
    }
}

export async function unhideUniversities(
    studentId: number,
    admissionIds: number[]
): Promise<HideUniversitiesResponse> {
    const body: HideUniversitiesRequest = {
        student_id: studentId,
        admission_ids: admissionIds,
    };
    try {
        // console.log('[unhideUniversities] request body:', body);
        const res = await api.post<HideUniversitiesResponse>(
            '/api/v1/school-recommendations/unhide',
            body
        );
        // console.log('[unhideUniversities] response:', res.data);
        return {
            ...res.data,
            success: true,
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('[unhideUniversities] Axios error:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data
            });
            return {
                success: false,
                message: error.response?.data?.message || `서버 오류: ${error.response?.status || 'Network Error'}`,
            };
        } else if (error instanceof Error) {
            console.error('[unhideUniversities] Error:', error.message);
            return {
                success: false,
                message: `오류: ${error.message}`,
            };
        } else {
            console.error('[unhideUniversities] Unknown error:', error);
            return {
                success: false,
                message: '알 수 없는 오류가 발생했습니다.',
            };
        }
    }
}

interface FetchHiddenUniversitiesResponse {
    student_id: number;
    hidden_schools: UniversityItem[];
    total_count: number;
}

export async function fetchHiddenUniversities(studentId: number): Promise<UniversityItem[]> {
    try {
        // console.log('[fetchHiddenUniversities] request studentId:', studentId);
        const res = await api.get<FetchHiddenUniversitiesResponse>(`/api/v1/school-recommendations/hidden/${studentId}`);
        // console.log('[fetchHiddenUniversities] response:', res.data);
        return res.data.hidden_schools;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('[fetchHiddenUniversities] Axios error:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data
            });
        } else if (error instanceof Error) {
            console.error('[fetchHiddenUniversities] Error:', error.message);
        } else {
            console.error('[fetchHiddenUniversities] Unknown error:', error);
        }
        return [];
    }
} 