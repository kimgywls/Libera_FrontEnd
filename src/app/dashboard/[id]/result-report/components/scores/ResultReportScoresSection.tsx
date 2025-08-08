import type { FC } from 'react';

import { Score } from '@/app/types/score';

import ResultReportSection from '../ResultReportSection';
import ReportScoresTable from './ResultReportScoresTable';

interface ScoresSectionProps {
    grade: number;
    semester: number;
    scores: Score[];
}

const ResultReportScoresSection: FC<ScoresSectionProps> = ({
    grade,
    semester,
    scores,
}) => {
    return (
        <ResultReportSection
            title={`${grade}학년 ${semester}학기 내신 성적`}
        >
            <ReportScoresTable
                scores={scores}
                grade={grade}
                semester={semester}
            />
        </ResultReportSection>
    );
};

export default ResultReportScoresSection; 