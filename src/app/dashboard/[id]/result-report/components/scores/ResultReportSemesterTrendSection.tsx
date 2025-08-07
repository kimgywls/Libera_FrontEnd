import type { FC } from 'react';
import ResultReportSemesterTrendTable from './ResultReportSemesterTrendTable';
import { SemesterTrendResponse } from '@/app/types/semesterTrend';
import ResultReportSection from '../ResultReportSection';

interface SemesterTrendSectionProps {
    overallGpa: number;
    semesterTrend?: SemesterTrendResponse;
}

const ResultReportSemesterTrendSection: FC<SemesterTrendSectionProps> = ({
    overallGpa,
    semesterTrend,
}) => (
    <ResultReportSection
        title="학기별 석차등급"
        subtitle={`전학기 전체교과 내신 성적 : ${overallGpa}`}
    >
        <ResultReportSemesterTrendTable semesterTrend={semesterTrend} />
    </ResultReportSection>
);

export default ResultReportSemesterTrendSection; 