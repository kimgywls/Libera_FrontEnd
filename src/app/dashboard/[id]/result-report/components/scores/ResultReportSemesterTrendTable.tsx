import { FC, memo, useMemo } from 'react';
import { SemesterTrendResponse } from '@/app/types/semesterTrend';
import { SEMESTER_TREND_CATEGORY_LABELS } from '@/app/constants';
import ResultReportBaseTable from '../ResultReportBaseTable';
import DataState from '@/app/dashboard/_components/DataState';
import { PERIODS } from '@/app/constants';

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
}

const ResultReportSemesterTrendTable: FC<SemesterTrendTableProps> = memo(
    ({ semesterTrend }) => {
        const tableData = useMemo<SemesterTrendTableRow[]>(() => {
            if (!semesterTrend?.categories) return [];

            return semesterTrend.categories.map(cat => {
                const row: SemesterTrendTableRow = {
                    categoryName: SEMESTER_TREND_CATEGORY_LABELS[cat.id] || cat.name,
                };

                // 각 기간에 대해 데이터 매핑
                PERIODS.forEach(period => {
                    const matchingPeriod = cat.periods.find(p =>
                        p.grade === period.grade && p.semester === period.semester
                    );
                    row[period.label] = matchingPeriod ? matchingPeriod.gpa : '-';
                });

                return row;
            });
        }, [semesterTrend]);

        const isEmpty = !semesterTrend?.categories || semesterTrend.categories.length === 0;

        return (
            <DataState
                isLoading={false}
                isError={false}
                isEmpty={isEmpty}
                errorMessage="석차등급 정보를 불러오는 데 실패했습니다."
                emptyMessage="석차등급 정보가 없습니다."
            >
                <ResultReportBaseTable
                    columns={columns}
                    data={tableData}
                    className="mt-6"
                />
            </DataState>
        );
    }
);

ResultReportSemesterTrendTable.displayName = 'ResultReportSemesterTrendTable';

export default ResultReportSemesterTrendTable; 