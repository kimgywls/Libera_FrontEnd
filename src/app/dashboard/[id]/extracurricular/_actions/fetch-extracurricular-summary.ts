import { extracurricularApiService } from '@/app/lib/api-client';
import { ExtracurricularSummary, ExtracurricularApiData } from '@/app/types/extracurricular';

export async function fetchExtracurricularSummary(studentId: number): Promise<ExtracurricularSummary> {
    try {
        const data = await extracurricularApiService.get<ExtracurricularApiData>(`/api/v1/extracurricular/student/${studentId}/summary`);

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
        console.error('[fetchExtracurricularSummary] error:', error);
        throw error;
    }
} 