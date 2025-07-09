import { API_URL } from '@/app/constants';
import axios from 'axios';

const api = axios.create({ baseURL: API_URL });

export interface MultipleUploadResponse {
    success: boolean;
    message: string;
    job_id?: string;
    total_files?: number;
    status_url?: string;
    status?: number;
}

interface ErrorResponse {
    detail?: string;
    message?: string;
}

export async function uploadPdfFiles(files: File[]): Promise<MultipleUploadResponse> {
    try {
        const formData = new FormData();
        files.forEach(file => formData.append('files', file));
        const { data } = await api.post<MultipleUploadResponse>(
            'api/v1/pdf/upload-multiple',
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return { ...data, success: true, status: 200 };
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const status = err.response?.status;
            let message = '알 수 없는 오류';
            if (status === 404) {
                message = '요청한 리소스를 찾을 수 없습니다';
            } else if (status === 422) {
                message = 'Validation Error';
            } else if (typeof err.response?.data === 'object') {
                const data = err.response?.data as ErrorResponse;
                message = data.message || data.detail || message;
            } else if (typeof err.response?.data === 'string') {
                message = err.response.data;
            }
            return { success: false, message, status };
        }
        return { success: false, message: '알 수 없는 오류', status: undefined };
    }
} 