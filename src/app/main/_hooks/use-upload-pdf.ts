import { useMutation } from '@tanstack/react-query';

import { uploadPdfFiles, MultipleUploadResponse } from '../_actions/upload-pdf';

export function useUploadPdf() {
    const mutation = useMutation<MultipleUploadResponse, Error, File[]>({
        mutationFn: uploadPdfFiles,
    });

    const upload = async (files: File[]) => {
        return await mutation.mutateAsync(files);
    };

    const reset = () => {
        mutation.reset();
    };

    return {
        uploading: mutation.isPending,
        result: mutation.data,
        error: mutation.error?.message || '',
        upload,
        reset,
    };
} 