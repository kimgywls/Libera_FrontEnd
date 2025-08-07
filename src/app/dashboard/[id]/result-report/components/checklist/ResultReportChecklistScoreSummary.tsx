import { FC } from 'react';

interface ResultReportChecklistScoreSummaryProps {
    academicScore: number;
    careerScore: number;
    communityScore: number;
    totalScore: number;
}

const MAX_SCORE = 100;

const ResultReportChecklistScoreSummary: FC<ResultReportChecklistScoreSummaryProps> = ({
    academicScore,
    careerScore,
    communityScore,
    totalScore,
}) => {
    const Cell = ({ label, value, max }: { label: string; value: number; max: number }) => (
        <div className="flex flex-col items-center justify-center px-4 py-3 space-y-1 border-r last:border-r-0 w-full" style={{ borderColor: 'rgb(209, 213, 219)' }}>
            <div className="text-sm font-semibold">{label}</div>
            <div className="px-3 py-1 rounded-full text-lg font-bold tracking-wide" style={{ backgroundColor: 'rgb(255, 255, 255)' }}>
                {value} / {max}
            </div>
        </div>
    );

    return (
        <section className="w-full shadow" style={{ backgroundColor: 'rgb(250, 245, 255)' }}>
            <div className="grid grid-cols-4 divide-x text-center text-sm border rounded-lg" style={{ borderColor: 'rgb(209, 213, 219)', color: 'rgb(0, 0, 0)' }}>
                <Cell label="학업역량" value={academicScore} max={MAX_SCORE} />
                <Cell label="진로역량" value={careerScore} max={MAX_SCORE} />
                <Cell label="공동체역량" value={communityScore} max={MAX_SCORE} />
                <Cell label="합계" value={totalScore} max={MAX_SCORE * 3} />
            </div>
        </section>
    );
};

export default ResultReportChecklistScoreSummary;
