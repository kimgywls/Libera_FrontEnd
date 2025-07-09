import { FC, memo, useMemo } from 'react';
import { Score } from '@/app/types/score';
import { CATEGORY_COLUMNS } from '@/app/constants';

interface ScoresTableProps {
    scores?: Score[];
    isLoading: boolean;
    isError: boolean;
    grade: number;
    semester: number;
    category: '일반선택' | '진로선택' | '체육/예술';
}

const ScoresTable: FC<ScoresTableProps> = memo(({ scores, isLoading, isError, grade, semester, category }) => {
    const columns = CATEGORY_COLUMNS[category];
    const filtered = useMemo(() => {
        if (!scores) return [];
        return scores.filter(
            s =>
                s.grade === grade &&
                s.semester === semester &&
                s.subject_type === category
        );
    }, [scores, grade, semester, category]);

    if (isLoading) return <div className="py-4 text-center text-gray-500">로딩 중...</div>;
    if (isError) return <div className="py-4 text-center text-red-500">성적 정보를 불러오는 데 실패했습니다.</div>;
    if (!filtered.length) return <div className="text-center text-gray-400"><div className="text-gray-700 bg-gray-100 rounded-md py-5">해당 성적이 없습니다.</div></div>;

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map(col => (
                            <th key={col.key} className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-x border-gray-200">{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {filtered.map((score, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                            {columns.map(col => (
                                <td key={col.key} className="px-4 py-2 whitespace-nowrap text-gray-900 border-x border-gray-200 ">
                                    {(() => {
                                        const value = score[col.key];
                                        if (
                                            typeof value === 'object' &&
                                            value !== null &&
                                            !Array.isArray(value)
                                        ) {
                                            return Object.entries(value as Record<string, unknown>)
                                                .map(([k, v]) => `${k}: ${v}`)
                                                .join(', ');
                                        }
                                        return value !== undefined && value !== null && value !== '' ? value : '-';
                                    })()}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
});

ScoresTable.displayName = 'ScoresTable';
export default ScoresTable; 