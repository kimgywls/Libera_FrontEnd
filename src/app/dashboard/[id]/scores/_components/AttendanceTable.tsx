import { FC, memo } from 'react';
import { AttendanceApiResponse } from '@/app/types/attendance';
import BaseTable from '../../../_components/BaseTable';
import DataState from '../../../_components/DataState';

interface AttendanceTableProps {
    attendance: AttendanceApiResponse;
    isLoading: boolean;
    isError: boolean;
}

const columns = [
    { key: 'grade', label: '학년' },
    { key: 'total_days', label: '총 등교일수' },
    { key: 'absence_disease', label: `결석\n(질병)` },
    { key: 'absence_unexcused', label: `결석\n(무단)` },
    { key: 'absence_etc', label: `결석\n(기타)` },
    { key: 'tardiness_disease', label: `지각\n(질병)` },
    { key: 'tardiness_unexcused', label: `지각\n(무단)` },
    { key: 'tardiness_etc', label: `지각\n(기타)` },
    { key: 'early_leave_disease', label: `조퇴\n(질병)` },
    { key: 'early_leave_unexcused', label: `조퇴\n(무단)` },
    { key: 'early_leave_etc', label: `조퇴\n(기타)` },
    { key: 'result_disease', label: `결과\n(질병)` },
    { key: 'result_unexcused', label: `결과\n(무단)` },
    { key: 'result_etc', label: `결과\n(기타)` },
    { key: 'special_notes', label: '특이사항' },
];

const AttendanceTable: FC<AttendanceTableProps> = memo(({ attendance, isLoading, isError }) => {
    const isEmpty = !attendance || !attendance.records || !attendance.records.length;

    return (
        <DataState
            isLoading={isLoading}
            isError={isError}
            isEmpty={isEmpty}
            errorMessage="출결 정보를 불러오는 데 실패했습니다."
            emptyMessage="출결 정보를 찾을 수 없습니다."
        >
            <BaseTable
                columns={columns}
                data={attendance.records || []}
            />
        </DataState>
    );
});

AttendanceTable.displayName = 'AttendanceTable';
export default AttendanceTable; 