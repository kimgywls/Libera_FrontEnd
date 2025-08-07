import { FC, memo } from 'react';
import { AttendanceApiResponse } from '@/app/types/attendance';
import ResultReportBaseTable from '../ResultReportBaseTable';
import DataState from '@/app/dashboard/_components/DataState';

interface AttendanceTableProps {
    attendance: AttendanceApiResponse;
}

const columns = [
    { key: 'grade', label: '학년' },
    { key: 'total_days', label: '총 등교일수' },
    { key: 'absence_disease', label: `결석\n질병` },
    { key: 'absence_unexcused', label: `결석\n무단` },
    { key: 'absence_etc', label: `결석\n기타` },
    { key: 'tardiness_disease', label: `지각\n질병` },
    { key: 'tardiness_unexcused', label: `지각\n무단` },
    { key: 'tardiness_etc', label: `지각\n기타` },
    { key: 'early_leave_disease', label: `조퇴\n질병` },
    { key: 'early_leave_unexcused', label: `조퇴\n무단` },
    { key: 'early_leave_etc', label: `조퇴\n기타` },
    { key: 'result_disease', label: `결과\n질병` },
    { key: 'result_unexcused', label: `결과\n무단` },
    { key: 'result_etc', label: `결과\n기타` },
];

const AttendanceTable: FC<AttendanceTableProps> = memo(({ attendance }) => {
    const isEmpty = !attendance || !attendance.records || !attendance.records.length;

    return (
        <DataState
            isLoading={false}
            isError={false}
            isEmpty={isEmpty}
            errorMessage="출결 정보를 불러오는 데 실패했습니다."
            emptyMessage="출결 정보를 찾을 수 없습니다."
        >
            <ResultReportBaseTable
                columns={columns}
                data={attendance.records || []}
                headerClassName=""
            />
        </DataState>
    );
});

AttendanceTable.displayName = 'AttendanceTable';
export default AttendanceTable; 