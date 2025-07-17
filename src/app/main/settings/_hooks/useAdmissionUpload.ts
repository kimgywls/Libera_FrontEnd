import { useState } from 'react';
import { uploadAdmissionData } from '../_actions/admissionUpload';
import axios from 'axios';

export function useAdmissionUpload() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const upload = async (target_year: number, file: File) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await uploadAdmissionData(target_year, file);
            setSuccess(true);
        } catch (err: unknown) {
            let message = '업로드 실패';
            if (axios.isAxiosError(err)) {
                message = err.response?.data?.message
                    || (Array.isArray(err.response?.data?.detail) && err.response.data.detail[0]?.msg)
            }
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return { upload, loading, error, success };
} 