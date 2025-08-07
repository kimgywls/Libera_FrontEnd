import { FC } from "react";

import ResultReportCategoryEvaluationSection from "./ResultReportCategoryEvaluationSection";
import ResultReportOverallEvaluationSection from "./ResultReportOverallEvaluationSection";
import { FinalEvaluationResponse } from "@/app/types/comprehensiveEvaluation";

interface ResultReportComprehensiveEvaluationSectionProps {
    finalEvaluation?: FinalEvaluationResponse | null;
    overallEvaluation?: string | null;
}

const ResultReportComprehensiveEvaluationSection: FC<ResultReportComprehensiveEvaluationSectionProps> = ({
    finalEvaluation,
    overallEvaluation,
}) => {
    return (
        <div className="space-y-10">
            <ResultReportCategoryEvaluationSection
                categoryEvaluations={finalEvaluation?.category_evaluations}
            />

            <ResultReportOverallEvaluationSection
                overallEvaluation={overallEvaluation || undefined}
            />
        </div>
    );
};

export default ResultReportComprehensiveEvaluationSection; 