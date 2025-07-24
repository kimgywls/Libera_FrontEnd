import axios from 'axios';

import { API_URL } from '@/app/constants';
import { ScoresResponse } from '@/app/types/score';

const api = axios.create({ baseURL: API_URL });

export async function fetchStudentScores(studentId: number): Promise<ScoresResponse> {
    try {
        const { data }: { data: { success: boolean; message: string; data: ScoresResponse } } = await api.get(`/api/v1/scores/students/${studentId}`);
        return data.data;
    } catch (error) {
        console.error('[fetchStudentScores] error:', error);
        throw error;
    }
} 