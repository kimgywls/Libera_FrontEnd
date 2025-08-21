import { studentApiService } from '@/app/lib/api-client';

export async function updateConsultationDateAction(studentId: number, date: Date) {
    try {
        // 실제 API 스펙에 맞게 수정 필요
        await studentApiService.post(`api/v1/students/${studentId}/consultation-date`, {
            student_id: studentId,
            consultation_date: date.toISOString(),
        });
        return true;
    } catch (error) {
        console.error('[updateConsultationDateAction] error:', error);
        throw error;
    }
} 