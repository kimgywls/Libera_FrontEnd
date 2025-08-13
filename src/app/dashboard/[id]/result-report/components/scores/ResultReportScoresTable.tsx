import { FC, memo, useMemo } from 'react';
import { Score } from '@/app/types/score';
import { RESULT_REPORT_CATEGORY_COLUMNS } from '@/app/constants';
import ResultReportBaseTable from '../ResultReportBaseTable';
import DataState from '@/app/dashboard/_components/DataState';

interface ScoresTableProps {
    scores?: Score[];
    grade: number;
    semester: number;
    category: '일반선택' | '진로선택' | '체육/예술';
}

const ResultReportScoresTable: FC<ScoresTableProps> = memo(({ scores, grade, semester, category }) => {
    const { columns, filteredData } = useMemo(() => {
        const columns = RESULT_REPORT_CATEGORY_COLUMNS[category];
        const filtered = scores?.filter(
            s => s.grade === grade && s.semester === semester && s.subject_type === category
        ) || [];

        return { columns, filteredData: filtered };
    }, [scores, grade, semester, category]);
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