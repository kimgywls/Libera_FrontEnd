import React, { useState, useEffect } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { StudentReportData } from '@/app/types/report';
import ReportPDF from './ReportPDF';


interface ReportPDFViewerProps {
    data: StudentReportData;
    chartImages?: {
        checklistChart?: string;
        semesterTrendCharts?: string[];
    };
    onClose: () => void;
}

const ReportPDFViewer: React.FC<ReportPDFViewerProps> = ({ data, chartImages, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);



    const handleDownload = () => {
        setIsLoading(true);
        // 다운로드가 시작되면 로딩 상태를 해제
        setTimeout(() => setIsLoading(false), 1000);
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="bg-white rounded-lg shadow-xl w-11/12 h-5/6 flex flex-col relative">
                {/* 헤더 */}
                <div className="flex justify-between items-center p-4 border-b bg-white relative z-10">
                    <h2 className="text-xl font-bold text-gray-800">
                        {data.studentInfo.name} 학생 결과보고서
                    </h2>
                    <div className="flex space-x-2">
                        <PDFDownloadLink
                            document={<ReportPDF data={data} chartImages={chartImages} />}
                            fileName={`${data.studentInfo.name}_결과보고서_${new Date().toISOString().split('T')[0]}.pdf`}
                            onClick={handleDownload}
                        >
                            {({ loading }) => (
                                <button
                                    className={`px-4 py-2 rounded-md font-medium ${loading || isLoading
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                        }`}
                                    disabled={loading || isLoading}
                                >
                                    {loading || isLoading ? '다운로드 중...' : 'PDF 다운로드'}
                                </button>
                            )}
                        </PDFDownloadLink>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onClose();
                            }}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 relative z-20"
                        >
                            닫기
                        </button>
                    </div>
                </div>

                {/* PDF 뷰어 */}
                <div className="flex-1 p-4 relative">
                    <PDFViewer
                        style={{
                            width: '100%',
                            height: '100%',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                        }}
                    >
                        <ReportPDF data={data} chartImages={chartImages} />
                    </PDFViewer>
                </div>
            </div>
        </div>
    );
};

export default ReportPDFViewer; 