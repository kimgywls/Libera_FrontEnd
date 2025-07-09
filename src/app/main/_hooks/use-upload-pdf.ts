import { useState, useCallback } from 'react';
import { uploadPdfFiles, MultipleUploadResponse } from '../_actions/upload-pdf';

export function useUploadPdf() {
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState<MultipleUploadResponse | null>(null);
    const [error, setError] = useState('');

    const upload = useCallback(async (files: File[]) => {
        setUploading(true);
        setError('');
        setResult(null);
        const res = await uploadPdfFiles(files);
        setResult(res);
        if (!res.success) setError('업로드 실패: ' + res.message);
        setUploading(false);
        return res;
    }, []);

    const reset = useCallback(() => {
        setResult(null);
        setError('');
    }, []);

    return { uploading, result, error, upload, reset };
} 