import type { FC } from 'react';
import AttendanceTable from './AttendanceTable';
import { AttendanceApiResponse } from '@/app/types/attendance';
import Section from '../../../_components/Section';

interface AttendanceSectionProps {
    attendance: AttendanceApiResponse;
    isLoading: boolean;
    isError: boolean;
}

const AttendanceSection: FC<AttendanceSectionProps> = ({ attendance, isLoading, isError }) => (
    <Section title="출결">
        <AttendanceTable attendance={attendance} isLoading={isLoading} isError={isError} />
    </Section>
);

export default AttendanceSection; 