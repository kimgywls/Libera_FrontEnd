import React, { useRef, useCallback, useState } from 'react';
import { X } from 'lucide-react';

import { MultipleUploadResponse } from '../../_actions/upload-pdf';

import { useUploadPdf } from '../../_hooks/use-upload-pdf';

interface AddStudentModalProps {
    open: boolean;
    onClose: () => void;
    onUploaded?: (result: MultipleUploadResponse) => void;
}

export const AddStudentModal: React.FC<AddStudentModalProps> = React.memo(({ open, onClose, onUploaded }) => {
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { uploading, result, error, upload, reset } = useUploadPdf();

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files) {
            setFiles(Array.from(e.dataTransfer.files).filter(f => f.type === 'application/pdf'));
        }
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }, []);

    const handleUpload = useCallback(async () => {
        if (!files.length) {
            reset();
            alert('업로드할 PDF 파일을 선택하세요.');
            return;
        }
        try {
            const res = await upload(files);
            if (onUploaded) onUploaded(res);
        } catch {
            // 에러는 훅에서 관리
        }
    }, [files, upload, onUploaded, reset]);

    const handleModalClose = useCallback(() => {
        setFiles([]);
        reset();
        onClose();
    }, [onClose, reset]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md relative">
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    onClick={handleModalClose}
                    aria-label="닫기"
                >
                    <X className="w-4 h-4" />
                </button>
                <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${files.length ? 'border-violet-500 bg-violet-50' : 'border-gray-300 hover:border-gray-400'}`}
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <input
                        id="file-input"
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    {files.length ? (
                        <div>
                            <div className="text-gray-700 font-medium mb-2">{files.length}개 파일이 선택됨</div>
                            <ul className="text-sm text-gray-600">
                                {files.map(f => <li key={f.name}>{f.name}</li>)}
                            </ul>
                        </div>
                    ) : (
                        <div>
                            <div className="text-gray-600 mb-2">PDF 파일을 드래그하거나 클릭하여 선택하세요</div>
                            <div className="text-sm text-gray-500">지원 형식: PDF</div>
                        </div>
                    )}
                </div>
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                <button
                    type="button"
                    onClick={handleUpload}
                    className="mt-4 px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600 w-full"
                    disabled={uploading}
                >
                    {uploading ? '업로드 중...' : '업로드'}
                </button>
                {result && (
                    <div className="mt-4 text-sm text-green-600">
                        <div>업로드 성공: {result.success ? '성공' : '실패'}</div>
                        <div>메시지: {result.message}</div>
                        <div>파일 수: {result.total_files}</div>
                        <div>작업 ID: {result.job_id}</div>
                        <div>상태 URL: {result.status_url}</div>
                    </div>
                )}
            </div>
        </div>
    );
});

AddStudentModal.displayName = 'AddStudentModal'; 