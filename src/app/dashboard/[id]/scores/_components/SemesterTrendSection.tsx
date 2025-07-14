import type { FC } from 'react';
import SemesterTrendTable from './SemesterTrendTable';
import { SemesterTrendResponse } from '@/app/types/semesterTrend';
import Section from '../../../_components/Section';

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
    <Section
        title="학기별 석차등급"
        subtitle={`전학기 전체교과 내신 성적 : ${overallGpa}`}
    >
        <SemesterTrendTable semesterTrend={semesterTrend} isLoading={isTrendLoading} isError={isTrendError} />
    </Section>
);

export default SemesterTrendSection; 