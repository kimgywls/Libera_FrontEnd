import { FC } from "react";
import FinalRecommendedSchoolsList from "./FinalRecommendedSchoolsList";
import RecommendedSchoolAnalysis from "./RecommendedSchoolAnalysis";
import type { SavedRecommendation } from '@/app/types/university';
import RecommendedSchoolSummary from "./RecommendedSchoolSummary";

interface FinalRecommendedSchoolsSectionProps {
    savedRecommendations: SavedRecommendation[] | undefined;
    isLoading: boolean;
    error: Error | null;
}

const FinalRecommendedSchoolsSection: FC<FinalRecommendedSchoolsSectionProps> = ({
    savedRecommendations,
    isLoading,
    error,
}) => {
    return (
        <div className="space-y-10">
            <FinalRecommendedSchoolsList
                savedRecommendations={savedRecommendations}
                isLoading={isLoading}
                error={error}
            />
            <RecommendedSchoolAnalysis
                savedRecommendations={savedRecommendations}
            />
            <RecommendedSchoolSummary
                savedRecommendations={savedRecommendations}
            />
        </div>
    );
}

export default FinalRecommendedSchoolsSection;  