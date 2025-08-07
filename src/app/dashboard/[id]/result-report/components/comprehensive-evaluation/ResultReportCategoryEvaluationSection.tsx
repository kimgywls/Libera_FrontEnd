import { FC } from "react";

import ResultReportSection from "../ResultReportSection";
import DataState from "@/app/dashboard/_components/DataState";
import { FinalEvaluationResponse } from "@/app/types/comprehensiveEvaluation";
import ResultReportCategoryEvaluationCard from "./ResultReportCategoryEvaluationCard";

interface ResultReportCategoryEvaluationSectionProps {
    categoryEvaluations?: FinalEvaluationResponse['category_evaluations'];
}

const ResultReportCategoryEvaluationSection: FC<ResultReportCategoryEvaluationSectionProps> = ({
    categoryEvaluations = [],
}) => {
    return (
        <ResultReportSection title="학생부 종합 분석 및 의견">
            <DataState
                isLoading={false}
                isError={false}
                isEmpty={!categoryEvaluations?.length}
                loadingMessage="학생부 종합 의견을 불러오는 중입니다..."
                errorMessage="학생부 종합 의견을 불러오는데 실패했습니다."
                emptyMessage="등록된 학생부 종합 의견이 없습니다."
            >
                <div className="space-y-7 ">
                    {categoryEvaluations?.map((category) => (
                        <ResultReportCategoryEvaluationCard
                            key={category.main_category_id}
                            category={category}
                        />
                    ))}
                </div>
            </DataState>
        </ResultReportSection>
    );
};

export default ResultReportCategoryEvaluationSection; 