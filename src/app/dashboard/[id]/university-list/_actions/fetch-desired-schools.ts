import axios from 'axios';
import { DesiredSchool } from '@/app/types/school-recommendation';
import { API_URL } from '@/app/constants';

const api = axios.create({ baseURL: API_URL });
export async function fetchDesiredSchools(studentId: number): Promise<DesiredSchool[]> {
    try {
        const { data }: { data: DesiredSchool[] } = await api.get(`/api/v1/desired-schools/student/${studentId}`);
        //console.log('[fetchDesiredSchools] response:', data);
        return data;
    } catch (error) {
        console.error('[fetchDesiredSchools] error:', error);
        throw error;
    }
} 