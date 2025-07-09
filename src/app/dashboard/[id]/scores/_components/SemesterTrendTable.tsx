import { FC, memo } from 'react';
import { SemesterTrendResponse } from '@/app/types/semesterTrend';
import { SEMESTER_TREND_CATEGORY_LABELS } from '@/app/constants';

const PERIODS = [
    { label: '1학년1학기', grade: 1, semester: 1 },
    { label: '1학년2학기', grade: 1, semester: 2 },
    { label: '2학년1학기', grade: 2, semester: 1 },
    { label: '2학년2학기', grade: 2, semester: 2 },
    { label: '3학년1학기', grade: 3, semester: 1 },
];

interface SemesterTrendTableProps {
    semesterTrend?: SemesterTrendResponse;
    isLoading: boolean;
    isError: boolean;
}

const SemesterTrendTable: FC<SemesterTrendTableProps> = memo(
    ({ semesterTrend, isLoading, isError }) => {
        if (isLoading)
            return (
                <div className="py-4 text-center text-gray-500">로딩 중...</div>
            );
        if (isError)
            return (
                <div className="py-4 text-center text-red-500">
                    석차등급 정보를 불러오는 데 실패했습니다.
                </div>
            );
        if (!semesterTrend?.categories || semesterTrend.categories.length === 0)
            return (
                <div className="py-4 text-center text-gray-400">
                    석차등급 정보가 없습니다.
                </div>
            );

        return (
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm mt-6">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-sm font-semibold text-gray-700 border-x border-gray-200">
                                교과
                            </th>
                            {PERIODS.map((p) => (
                                <th
                                    key={p.label}
                                    className="px-4 py-2 text-sm font-semibold text-gray-700 border-x border-gray-200"
                                >
                                    {p.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {semesterTrend.categories.map((cat) => (
                            <tr key={cat.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 whitespace-nowrap text-gray-900 border-x border-gray-200">
                                    {SEMESTER_TREND_CATEGORY_LABELS[cat.id] || cat.name}
                                </td>
                                {PERIODS.map((period) => {
                                    const item = cat.periods.find(
                                        (p) =>
                                            p.grade === period.grade && p.semester === period.semester
                                    );
                                    return (
                                        <td
                                            key={period.label}
                                            className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 border-x border-gray-200"
                                        >
                                            {item ? item.gpa : '-'}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
);

SemesterTrendTable.displayName = 'SemesterTrendTable';
export default SemesterTrendTable; 