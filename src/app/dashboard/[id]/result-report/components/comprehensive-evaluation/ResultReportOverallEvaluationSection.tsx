import { FC } from "react";

import ResultReportSection from "../ResultReportSection";
import DataState from "@/app/dashboard/_components/DataState";
import ResultReportOverallEvaluationCard from "./ResultReportOverallEvaluationCard";

interface ResultReportOverallEvaluationSectionProps {
    overallEvaluation?: string | null;
}

const ResultReportOverallEvaluationSection: FC<ResultReportOverallEvaluationSectionProps> = ({
    overallEvaluation
}) => {
    return (
        <ResultReportSection title="최종 결과 및 의견">
            <DataState
                isLoading={false}
                isError={false}
                isEmpty={false}
                loadingMessage="전체 종합 의견을 불러오는 중입니다..."
                errorMessage="전체 종합 의견을 불러오는데 실패했습니다."
                emptyMessage="저장된 최종 종합 의견이 없습니다."
            >
                <div className="">
                    <ResultReportOverallEvaluationCard
                        overallEvaluation={overallEvaluation || undefined}
                    />
                </div>
            </DataState>
        </ResultReportSection>
    );
};

export default ResultReportOverallEvaluationSection; 