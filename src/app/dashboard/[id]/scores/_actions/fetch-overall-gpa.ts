import { scoreApiService } from '@/app/lib/api-client';

export interface OverallGpaResponse {
    student_id: number;
    gpa: number;
    main_subjects_gpa: number;
    total_scores: number;
    valid_scores: number;
    main_subjects_scores: number;
    main_subjects_valid_scores: number;
    message?: string;
}

export async function fetchOverallGpa(studentId: number): Promise<OverallGpaResponse> {
    try {
        const data = await scoreApiService.get<{ data: OverallGpaResponse }>(`api/v1/scores/students/${studentId}/gpa/overall`);
        return data.data;
    } catch (error) {
        console.error('[fetchOverallGpa] error:', error);
        throw error;
    }
} 