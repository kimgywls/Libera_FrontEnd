import axios from 'axios';
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
    } catch (error: unknown) {
        // console.error('[hideUniversities] error:', error);
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                message: error.response?.data?.message || '서버 오류',
            };
        }
        return {
            success: false,
            message: '알 수 없는 오류',
        };
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
    } catch (error: unknown) {
        // console.error('[unhideUniversities] error:', error);
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                message: error.response?.data?.message || '서버 오류',
            };
        }
        return {
            success: false,
            message: '알 수 없는 오류',
        };
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
    } catch {
        // console.error('[fetchHiddenUniversities] error:', error);
        return [];
    }
} 