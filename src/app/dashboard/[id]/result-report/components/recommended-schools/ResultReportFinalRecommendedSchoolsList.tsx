import { FC, useMemo } from "react";
import type { SavedRecommendationItem, SavedRecommendation } from '@/app/types/university';
import ResultReportBaseTable from '../ResultReportBaseTable';
import DataState from '@/app/dashboard/_components/DataState';
import { RECOMMEND_TYPE_COLOR } from '@/app/constants';
import ResultReportSection from "../ResultReportSection";

interface EditableItem extends SavedRecommendationItem {
    recommendation_id: number;
}

interface ResultReportFinalRecommendedSchoolsListProps {
    savedRecommendations: SavedRecommendation[] | undefined;
}

const ResultReportFinalRecommendedSchoolsList: FC<ResultReportFinalRecommendedSchoolsListProps> = ({
    savedRecommendations,
}) => {
    // 모든 저장된 추천 학교의 아이템들을 하나의 배열로 합치고 순위별로 정렬 (메모이제이션)
    const sortedItems = useMemo(() => {
        const allSavedItems: EditableItem[] = savedRecommendations?.flatMap(rec =>
            rec.items.map(item => ({ ...item, recommendation_id: rec.id }))
        ) || [];
        return allSavedItems.sort((a, b) => a.rank - b.rank);
    }, [savedRecommendations]);

    const columns = [
        { key: 'rank', label: '순서' },
        { key: 'university_name', label: '대학명' },
        { key: 'admission_type', label: '전형명' },
        { key: 'admission_category', label: '유형구분' },
        { key: 'major_name', label: '학과명' },
        {
            key: 'overall_evaluation',
            label: `지원\n적정성`,
            render: (value: string | number | boolean | undefined, row: EditableItem) => {

                const displayText = row.suitability_type === '신설' ? '적정' : row.suitability_type;
                const colorKey = row.suitability_type === '신설' ? '적정' : row.suitability_type;

                return (
                    <span className={`inline-block text-xs font-medium px-2 py-1 rounded ${RECOMMEND_TYPE_COLOR[colorKey]} `}>
                        {displayText}
                    </span>
                );
            }
        }
    ] as const;

    return (
        <ResultReportSection title="최종 추천 대학 목록">
            <div className="">
                <DataState
                    isLoading={false}
                    isError={false}
                    isEmpty={!savedRecommendations || savedRecommendations.length === 0}
                    loadingMessage="저장된 추천 학교를 불러오는 중..."
                    errorMessage="저장된 추천 학교를 불러오는데 실패했습니다."
                    emptyMessage="저장된 추천 학교가 없습니다."
                >
                    <ResultReportBaseTable
                        columns={columns}
                        data={sortedItems}
                        className="mt-4"
                    />
                </DataState>
            </div>
        </ResultReportSection>
    );
};

export default ResultReportFinalRecommendedSchoolsList;  