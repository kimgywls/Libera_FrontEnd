import { universityApiService } from '@/app/lib/api-client';
import type { UniversityItem } from '@/app/types/university';

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
        const response = await universityApiService.post<HideUniversitiesResponse>(
            `/api/v1/school-recommendations/${studentId}/hide-schools`,
            admissionIds
        );

        return response;
    } catch (error) {
        console.error('[hideUniversities] error:', error);
        throw error;
    }
};

export const unhideUniversities = async (studentId: number, admissionIds: number[]): Promise<HideUniversitiesResponse> => {
    try {
        const response = await universityApiService.post<HideUniversitiesResponse>(
            `/api/v1/school-recommendations/${studentId}/unhide-schools`,
            admissionIds
        );
        return response;
    } catch (error) {
        console.error('[unhideUniversities] error:', error);
        throw error;
    }
};

export const fetchHiddenUniversities = async (studentId: number): Promise<UniversityItem[]> => {
    try {
        const response = await universityApiService.get<{
            student_id: number;
            hidden_schools: UniversityItem[];
            total_count: number;
        }>(`/api/v1/school-recommendations/hidden/${studentId}`);

        return response.hidden_schools || [];
    } catch (error) {
        console.error('[fetchHiddenUniversities] error:', error);
        throw error;
    }
}; 