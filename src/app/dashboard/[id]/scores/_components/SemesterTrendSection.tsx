import type { FC } from 'react';
import SemesterTrendTable from './SemesterTrendTable';
import { SemesterTrendResponse } from '@/app/types/semesterTrend';

interface SemesterTrendSectionProps {
    overallGpa: number;
    semesterTrend?: SemesterTrendResponse;
    isTrendLoading: boolean;
    isTrendError: boolean;
}

const SemesterTrendSection: FC<SemesterTrendSectionProps> = ({
    overallGpa,
    semesterTrend,
    isTrendLoading,
    isTrendError,
}) => (
    <section className="mb-10 bg-white rounded-lg p-4">
        <div className="flex flex-row space-x-2 justify-between items-center border-b border-gray-200 pb-1 mb-3 mr-5">
            <h2 className="text-xl font-bold text-gray-800 mb-1">학기별 석차등급</h2>
        </div>
        <div className="text-lg font-semibold text-gray-700 mb-4">
            전학기 전체교과 내신 성적 : {overallGpa}
        </div>
        <SemesterTrendTable semesterTrend={semesterTrend} isLoading={isTrendLoading} isError={isTrendError} />
    </section>
);

export default SemesterTrendSection; 