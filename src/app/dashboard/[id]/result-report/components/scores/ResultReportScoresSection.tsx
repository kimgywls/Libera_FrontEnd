import type { FC } from 'react';

import { Score } from '@/app/types/score';

import ResultReportSection from '../ResultReportSection';
import ReportScoresTable from './ResultReportScoresTable';

const SCORE_CATEGORIES = ['일반선택', '진로선택', '체육/예술'] as const;

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
            <div className="space-y-2">
                {SCORE_CATEGORIES.map((cat) => (
                    <div key={cat} className="mb-4">
                        <div className="font-bold mb-2" style={{ color: 'rgb(55, 65, 81)' }}>[{cat}]</div>
                        <ReportScoresTable
                            scores={scores}
                            grade={grade}
                            semester={semester}
                            category={cat}
                        />
                    </div>
                ))}

            </div>
        </ResultReportSection>
    );
};

export default ResultReportScoresSection; 