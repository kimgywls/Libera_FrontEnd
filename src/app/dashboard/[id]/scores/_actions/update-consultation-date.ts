import axios from 'axios';

export async function updateConsultationDateAction(studentId: number, date: Date) {
    // 실제 API 스펙에 맞게 수정 필요
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/students/${studentId}/consultation-date`;
    await axios.post(apiUrl, {
        student_id: studentId,
        consultation_date: date.toISOString(),
    });
    return true;
} 