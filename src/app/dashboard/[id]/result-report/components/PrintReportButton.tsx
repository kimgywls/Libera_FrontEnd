'use client';

import { FC } from 'react';

import { useReportReadiness } from '../hooks/use-report-data';
import { useIsReportRendered } from '../hooks/use-report-rendered';

interface PrintReportButtonProps {
    studentId: number;
}

// 리포트 쿼리가 모두 성공하고 본문이 DOM 에 반영되기 전에는 인쇄를 막는다.
// 실패 시 인쇄 대신 오류 안내와 다시 시도를 제공한다.
const PrintReportButton: FC<PrintReportButtonProps> = ({ studentId }) => {
    const { readiness, total, readyCount, failedLabels, isRetrying, retry } = useReportReadiness(studentId);
    const isRendered = useIsReportRendered(studentId);
    const isReady = readiness === 'ready' && isRendered;

    return (
        <div className="flex items-center gap-3 no-print">
            <span role="status" aria-live="polite" className="text-sm text-gray-500">
                {readiness === 'loading' && `리포트 준비 중 (${readyCount}/${total})`}
                {readiness === 'ready' && !isRendered && '리포트 준비 중'}
                {readiness === 'error' && (
                    <span className="text-red-600">
                        일부 리포트 데이터를 불러오지 못했습니다: {failedLabels.join(', ')}
                    </span>
                )}
            </span>
            {readiness === 'error' && (
                <button
                    onClick={retry}
                    disabled={isRetrying}
                    className="px-4 py-3 rounded-lg font-medium border border-red-300 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                    {isRetrying ? '다시 불러오는 중...' : '다시 시도'}
                </button>
            )}
            <button
                onClick={() => window.print()}
                disabled={!isReady}
                className="px-6 py-3 rounded-lg font-medium bg-violet-500 text-white hover:bg-violet-600 transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
                결과보고서 생성
            </button>
        </div>
    );
};

export default PrintReportButton;
