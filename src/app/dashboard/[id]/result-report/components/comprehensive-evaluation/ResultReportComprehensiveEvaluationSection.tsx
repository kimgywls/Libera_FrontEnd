import { FC } from "react";

import ResultReportOverallEvaluationSection from "./ResultReportOverallEvaluationSection";
import { FinalEvaluationResponse } from "@/app/types/comprehensiveEvaluation";

interface ResultReportComprehensiveEvaluationSectionProps {
    finalEvaluation?: FinalEvaluationResponse | null;
    overallEvaluation?: string | null;
}

const ResultReportComprehensiveEvaluationSection: FC<ResultReportComprehensiveEvaluationSectionProps> = ({
    overallEvaluation,
}) => {
    return (
        <div>
            <ResultReportOverallEvaluationSection
                overallEvaluation={overallEvaluation || undefined}
            />
        </div>
    );
};

export default ResultReportComprehensiveEvaluationSection; 