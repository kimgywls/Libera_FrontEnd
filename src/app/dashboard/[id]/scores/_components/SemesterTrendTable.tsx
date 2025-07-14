import { FC, memo, useMemo } from 'react';
import { SemesterTrendResponse } from '@/app/types/semesterTrend';
import { SEMESTER_TREND_CATEGORY_LABELS } from '@/app/constants';
import BaseTable from '../../../_components/BaseTable';
import DataState from '../../../_components/DataState';

const PERIODS = [
    { label: '1학년1학기', grade: 1, semester: 1 },
    { label: '1학년2학기', grade: 1, semester: 2 },
    { label: '2학년1학기', grade: 2, semester: 1 },
    { label: '2학년2학기', grade: 2, semester: 2 },
    { label: '3학년1학기', grade: 3, semester: 1 },
];

const columns = [
    { key: 'categoryName', label: '교과' },
    ...PERIODS.map(period => ({
        key: period.label,
        label: period.label,
    }))
];

type SemesterTrendTableRow = {
    categoryName: string;
} & {
    [periodLabel: string]: string | number;
};

interface SemesterTrendTableProps {
    semesterTrend?: SemesterTrendResponse;
    isLoading: boolean;
    isError: boolean;
}

const SemesterTrendTable: FC<SemesterTrendTableProps> = memo(
    ({ semesterTrend, isLoading, isError }) => {
        const tableData = useMemo<SemesterTrendTableRow[]>(() => {
            if (!semesterTrend?.categories) return [];

            return semesterTrend.categories.map(cat => {
                const periodMap = Object.fromEntries(
                    cat.periods.map(p => [`${p.grade}학년${p.semester}학기`, p.gpa])
                );
                const periodData: Omit<SemesterTrendTableRow, 'categoryName'> = PERIODS.reduce((acc, period) => {
                    acc[period.label] = periodMap[period.label] || '-';
                    return acc;
                }, {} as Omit<SemesterTrendTableRow, 'categoryName'>);
                return {
                    categoryName: SEMESTER_TREND_CATEGORY_LABELS[cat.id] || cat.name,
                    ...periodData
                };
            });
        }, [semesterTrend]);

        const isEmpty = !semesterTrend?.categories || semesterTrend.categories.length === 0;

        return (
            <DataState
                isLoading={isLoading}
                isError={isError}
                isEmpty={isEmpty}
                errorMessage="석차등급 정보를 불러오는 데 실패했습니다."
                emptyMessage="석차등급 정보가 없습니다."
            >
                <BaseTable
                    columns={columns}
                    data={tableData}
                    className="mt-6"
                />
            </DataState>
        );
    }
);

SemesterTrendTable.displayName = 'SemesterTrendTable';
export default SemesterTrendTable; 