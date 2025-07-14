import { FC, memo, useMemo } from 'react';
import { Score } from '@/app/types/score';
import { CATEGORY_COLUMNS } from '@/app/constants';
import BaseTable from '../../../_components/BaseTable';
import DataState from '../../../_components/DataState';

interface ScoresTableProps {
    scores?: Score[];
    isLoading: boolean;
    isError: boolean;
    grade: number;
    semester: number;
    category: '일반선택' | '진로선택' | '체육/예술';
}

const ScoresTable: FC<ScoresTableProps> = memo(({ scores, isLoading, isError, grade, semester, category }) => {
    const { columns, filteredData } = useMemo(() => {
        const columns = CATEGORY_COLUMNS[category];
        const filtered = scores?.filter(
            s => s.grade === grade && s.semester === semester && s.subject_type === category
        ) || [];

        return { columns, filteredData: filtered };
    }, [scores, grade, semester, category]);

    const isEmpty = !filteredData.length;

    return (
        <DataState
            isLoading={isLoading}
            isError={isError}
            isEmpty={isEmpty}
            errorMessage="성적 정보를 불러오는 데 실패했습니다."
            emptyMessage="해당 성적이 없습니다."
        >
            <BaseTable
                columns={columns}
                data={filteredData}
            />
        </DataState>
    );
});

ScoresTable.displayName = 'ScoresTable';
export default ScoresTable; 