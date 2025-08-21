import { studentApiService } from '@/app/lib/api-client';

interface UpdateStudentConsultationRequest {
    name: string;
    birth_date: Date;
    phone_number: string;
    consultation_date: Date;
}

interface UpdateStudentConsultationResponse {
    success: boolean;
    message: string;
}

export const updateStudentConsultation = async (
    studentId: number,
    data: UpdateStudentConsultationRequest
): Promise<UpdateStudentConsultationResponse> => {
    try {
        const response = await studentApiService.put<UpdateStudentConsultationResponse>(
            `api/v1/students/${studentId}`,
            data
        );
        return response;
    } catch (error) {
        console.error('[updateStudentConsultation] error:', error);
        throw error;
    }
}; 