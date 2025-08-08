'use client';

import ResultReportWidget from './components/ResultReportWidget';
import './result-report.css';

export default function ResultReport2Page() {
    return (
        <div
            id="report-root"
            className="result-report-container"
        >
            <ResultReportWidget />
        </div>
    );
}
