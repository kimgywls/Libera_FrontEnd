import axios from 'axios';
import type { SchoolRecommendationResponse } from '@/app/types/school-recommendation';
import { API_URL } from '@/app/constants';

const api = axios.create({ baseURL: API_URL });

export const fetchSchoolRecommendations = async (
    studentId: number
): Promise<SchoolRecommendationResponse> => {
    const { data } = await api.get<SchoolRecommendationResponse>(`/api/v1/school-recommendations/${studentId}/by-desired-departments`);
    //console.log('[fetchSchoolRecommendations] response:', data);
    return data;
}; 