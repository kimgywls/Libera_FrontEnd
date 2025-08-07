import type { FC } from 'react';
import ResultReportAttendanceTable from './ResultReportAttendanceTable';
import { AttendanceApiResponse } from '@/app/types/attendance';
import ResultReportSection from '../ResultReportSection';

interface AttendanceSectionProps {
    attendance: AttendanceApiResponse;
}

const ResultReportAttendanceSection: FC<AttendanceSectionProps> = ({ attendance }) => (
    <ResultReportSection title="출결">
        <div className="">
            <ResultReportAttendanceTable attendance={attendance} />
        </div>
    </ResultReportSection>
);

export default ResultReportAttendanceSection; 