import { FC } from 'react';

interface ChecklistScoreSummaryProps {
    academicScore: number;
    careerScore: number;
    communityScore: number;
}

const MAX_SCORE = 100;

const ChecklistScoreSummary: FC<ChecklistScoreSummaryProps> = ({
    academicScore,
    careerScore,
    communityScore,
}) => {
    const totalScore = academicScore + careerScore + communityScore;

    const Cell = ({ label, value, max }: { label: string; value: number; max: number }) => (
        <div className="flex flex-col items-center justify-center px-4 py-3 space-y-1 border-r last:border-r-0 border-gray-300 w-full">
            <div className="text-sm font-semibold">{label}</div>
            <div className="bg-violet-100 px-3 py-1 rounded-full text-lg font-bold tracking-wide">
                {value} / {max}
            </div>
        </div>
    );

    return (
        <section className="max-w-4xl mx-auto border border-gray-300 rounded-md overflow-hidden bg-white shadow">
            <div className="grid grid-cols-4 divide-x divide-gray-300 text-center text-sm text-black">
                <Cell label="학업역량" value={academicScore} max={MAX_SCORE} />
                <Cell label="진로역량" value={careerScore} max={MAX_SCORE} />
                <Cell label="공동체역량" value={communityScore} max={MAX_SCORE} />
                <Cell label="합계" value={totalScore} max={MAX_SCORE * 3} />
            </div>
        </section>
    );
};

export default ChecklistScoreSummary;
