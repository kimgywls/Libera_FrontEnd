'use client';

import { FC, useState, useRef, useCallback } from "react";
import {
    Upload,
    Calendar,
    FileText,
    CheckCircle,
    AlertCircle,
    X,
    FileSpreadsheet,
    Loader2
} from 'lucide-react';
import { useAdmissionUpload } from '../_hooks/useAdmissionUpload';

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR + i);

const UploadAdmissionData: FC = () => {
    const [year, setYear] = useState<number>(CURRENT_YEAR);
    const [file, setFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { upload, loading, error, success } = useAdmissionUpload();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    }, []);

    const handleSubmit = async () => {
        if (!file) return;
        await upload(year, file);
    };

    const removeFile = () => {
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-6 space-y-6">
                {/* 연도 선택 */}
                <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <Calendar className="w-4 h-4" />
                        <span>대상 연도</span>
                    </label>
                    <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white text-gray-900"
                        value={year}
                        onChange={e => setYear(Number(e.target.value))}
                    >
                        {YEARS.map(y => (
                            <option key={y} value={y}>{y}년</option>
                        ))}
                    </select>
                </div>

                {/* 파일 업로드 영역 */}
                <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <FileText className="w-4 h-4" />
                        <span>파일 선택</span>
                    </label>

                    {!file ? (
                        <div
                            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors bg-white ${dragActive
                                ? 'border-violet-400 bg-violet-50'
                                : 'border-gray-300 hover:border-gray-400 bg-white'
                                }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="space-y-3">
                                <div className="flex justify-center">
                                    <Upload className="w-10 h-10 text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-gray-600 font-medium">파일을 드래그하거나 클릭하여 선택</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Excel (.xlsx, .xls) 또는 CSV 파일
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <FileSpreadsheet className="w-8 h-8 text-green-600" />
                                    <div>
                                        <p className="font-medium text-gray-900">{file.name}</p>
                                        <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={removeFile}
                                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>

                {/* 상태 메시지 */}
                {success && (
                    <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-green-800">업로드가 완료되었습니다</span>
                    </div>
                )}

                {error && (
                    <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <span className="text-sm font-medium text-red-800">{error}</span>
                    </div>
                )}

                {/* 업로드 버튼 */}
                <button
                    onClick={handleSubmit}
                    disabled={loading || !file}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${loading || !file
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-violet-600 text-white hover:bg-violet-700 shadow-sm hover:shadow-md'
                        }`}
                >
                    {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>업로드 중...</span>
                        </div>
                    ) : (
                        '업로드'
                    )}
                </button>
            </div>
        </div>
    );
};

export default UploadAdmissionData;