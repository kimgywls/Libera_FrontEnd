import axios from 'axios';
import { API_URL } from '@/app/constants';

const api = axios.create({
    baseURL: API_URL,
});

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
        const response = await api.put<UpdateStudentConsultationResponse>(
            `/api/v1/students/${studentId}`,
            data
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || '상담 일정 업데이트에 실패했습니다.');
        }
        throw new Error('상담 일정 업데이트에 실패했습니다.');
    }
}; 