import { useMemo } from "react";

import type { ChecklistQuestion, ChecklistResponseItem, ChecklistDetailedResultResponse } from "@/app/types/checklist";

import ResultReportAcademicCompetencySection from "./ResultReportAcademicCompetencySection";
import ResultReportCareerCompetencySection from "./ResultReportCareerCompetencySection";
import ResultReportCommunityCompetencySection from "./ResultReportCommunityCompetencySection";
import ResultReportSection from "../ResultReportSection";
import ResultReportChecklistScoreSummary from "./ResultReportChecklistScoreSummary";
import ResultReportChecklistScoreChart from "./ResultReportChecklistScoreChart";

interface ChecklistSectionProps {
    questions: ChecklistQuestion[];
    responses: ChecklistResponseItem[];
    result: {
        "학업역량": number;
        "진로역량": number;
        "공동체역량": number;
        total: number;
    };
    detailedResult: ChecklistDetailedResultResponse | undefined; // This type was removed from imports, so we'll use 'any' for now or define a new type if needed.
}

export default function ResultReportChecklistSection({ questions, responses, result, detailedResult }: ChecklistSectionProps) {

    // responses 배열을 Record<number, number> 형태로 변환
    const responsesMap = useMemo(() => {
        return responses.reduce((acc, response) => {
            acc[response.checklist_question_id] = response.score;
            return acc;
        }, {} as Record<number, number>);
    }, [responses]);

    const academicQuestions = useMemo(
        () => questions.filter(q => q.main_category_id === 1),
        [questions]
    );
    const careerQuestions = useMemo(() => questions.filter(q => q.main_category_id === 2), [questions]);
    const communityQuestions = useMemo(() => questions.filter(q => q.main_category_id === 3), [questions]);



    return (
        <ResultReportSection
            title="비교과 분석"
        >
            <div className="flex flex-col w-full space-y-5">
                <ResultReportChecklistScoreSummary
                    academicScore={result["학업역량"]}
                    careerScore={result["진로역량"]}
                    communityScore={result["공동체역량"]}
                    totalScore={result.total}
                />

                <ResultReportAcademicCompetencySection
                    questions={academicQuestions}
                    responses={responsesMap}
                />
                <div className="result-report-page-break" />
                <ResultReportCareerCompetencySection
                    questions={careerQuestions}
                    responses={responsesMap}
                />
                <div className="result-report-page-break" />
                <ResultReportCommunityCompetencySection
                    questions={communityQuestions}
                    responses={responsesMap}
                />
                <div className="result-report-page-break" />
                <ResultReportChecklistScoreChart
                    data={detailedResult}
                />
            </div>
        </ResultReportSection>
    );
}