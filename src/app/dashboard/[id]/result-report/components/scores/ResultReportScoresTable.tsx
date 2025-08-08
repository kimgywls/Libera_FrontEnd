import { FC, memo, useMemo } from 'react';
import { Score } from '@/app/types/score';
import { RESULT_REPORT_CATEGORY_COLUMNS } from '@/app/constants';
import ResultReportBaseTable from '../ResultReportBaseTable';
import DataState from '@/app/dashboard/_components/DataState';

interface ScoresTableProps {
    scores?: Score[];
    grade: number;
    semester: number;
}

const ResultReportScoresTable: FC<ScoresTableProps> = memo(({ scores, grade, semester }) => {
    const { columns, filteredData } = useMemo(() => {
        // 모든 카테고리의 컬럼을 통합
        const allColumns = Object.values(RESULT_REPORT_CATEGORY_COLUMNS).flat();
        const uniqueColumns = allColumns.filter((column, index, self) =>
            index === self.findIndex(c => c.key === column.key)
        );

        // 교과 컬럼에 clamp 적용
        const columnsWithClamp = uniqueColumns.map(column => {
            if (column.key === 'curriculum') {
                return {
                    ...column,
                    render: (value: string | number | Record<string, unknown> | null | undefined) => (
                        <div style={{
                            width: 'clamp(60px, 80px, 120px)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}>
                            {String(value || '')}
                        </div>
                    )
                };
            }
            if (column.key === 'subject_type') {
                return {
                    ...column,
                    render: (value: string | number | Record<string, unknown> | null | undefined) => (
                        <div style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            {String(value || '')}
                        </div>
                    )
                };
            }
            if (column.key === 'subject') {
                return {
                    ...column,
                    render: (value: string | number | Record<string, unknown> | null | undefined) => {
                        const subjectText = String(value || '');
                        const fontSize = subjectText.length >= 7 ? '12px' : '14px';
                        return (
                            <div style={{
                                fontSize: fontSize
                            }}>
                                {subjectText}
                            </div>
                        );
                    }
                };
            }
            if (column.key === 'achievement_distribution') {
                return {
                    ...column,
                    render: (value: string | number | Record<string, unknown> | null | undefined) => {
                        let displayText = '';
                        if (!value || value === '-' || value === '') {
                            displayText = '-';
                        } else if (typeof value === 'object') {
                            displayText = Object.entries(value)
                                .map(([k, v]) => `${k}: ${v}`)
                                .join(' ');
                        } else {
                            displayText = String(value);
                        }
                        return (
                            <div style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                {displayText}
                            </div>
                        );
                    }
                };
            }
            return column;
        });

        // 해당 학년/학기의 모든 성적 데이터 필터링
        const filtered = scores?.filter(
            s => s.grade === grade && s.semester === semester
        ) || [];

        return { columns: columnsWithClamp, filteredData: filtered };
    }, [scores, grade, semester]);

    const isEmpty = !filteredData.length;

    return (
        <DataState
            isLoading={false}
            isError={false}
            isEmpty={isEmpty}
            errorMessage="성적 정보를 불러오는 데 실패했습니다."
            emptyMessage="해당 성적이 없습니다."
        >
            <ResultReportBaseTable
                columns={columns}
                data={filteredData}
            />
        </DataState>
    );
});

ResultReportScoresTable.displayName = 'ResultReportScoresTable';

export default ResultReportScoresTable; 