import { FC } from "react";
import ResultReportFinalRecommendedSchoolsList from "./ResultReportFinalRecommendedSchoolsList";
import ResultReportRecommendedSchoolAnalysis from "./ResultReportRecommendedSchoolAnalysis";
import type { SavedRecommendation } from '@/app/types/university';
import ResultReportRecommendedSchoolSummary from "./ResultReportRecommendedSchoolSummary";

interface ResultReportRecommendedSchoolsSectionProps {
    savedRecommendations: SavedRecommendation[] | undefined;
}

const ResultReportRecommendedSchoolsSection: FC<ResultReportRecommendedSchoolsSectionProps> = ({
    savedRecommendations,
}) => {
    return (
        <div className="space-y-10">

            <ResultReportFinalRecommendedSchoolsList
                savedRecommendations={savedRecommendations}
            />
            <ResultReportRecommendedSchoolAnalysis
                savedRecommendations={savedRecommendations}
            />
            <ResultReportRecommendedSchoolSummary
                savedRecommendations={savedRecommendations}
            />
        </div>
    );
}

export default ResultReportRecommendedSchoolsSection;  