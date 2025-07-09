import { FC, memo } from 'react';
import { AttendanceApiResponse } from '@/app/types/attendance';

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
    if (isLoading) return <div className="py-4 text-center text-gray-500">로딩 중...</div>;
    if (isError) return <div className="py-4 text-center text-red-500">출결 정보를 불러오는 데 실패했습니다.</div>;
    if (!attendance || !attendance.records || !attendance.records.length) return <div className="py-4 text-center text-gray-400">출결 정보를 찾을 수 없습니다.</div>;

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map(col => (
                            <th key={col.key} className="px-4 py-2 text-sm font-semibold text-gray-700 border-x border-gray-200 whitespace-pre-line">{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {attendance.records.map((record, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                            {columns.map(col => (
                                <td key={col.key} className="px-4 py-2 whitespace-nowrap text-gray-900 border-x border-gray-200">
                                    {record[col.key] ?? '-'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
});

AttendanceTable.displayName = 'AttendanceTable';
export default AttendanceTable; 