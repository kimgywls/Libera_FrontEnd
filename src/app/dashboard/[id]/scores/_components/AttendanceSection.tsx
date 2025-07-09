import type { FC } from 'react';
import AttendanceTable from './AttendanceTable';
import { AttendanceApiResponse } from '@/app/types/attendance';

interface AttendanceSectionProps {
    attendance: AttendanceApiResponse;
    isLoading: boolean;
    isError: boolean;
}

const AttendanceSection: FC<AttendanceSectionProps> = ({ attendance, isLoading, isError }) => (
    <section className="mb-10 bg-white rounded-lg p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">출결</h2>
        <AttendanceTable attendance={attendance} isLoading={isLoading} isError={isError} />
    </section>
);

export default AttendanceSection; 