import AcademicCompetencySection from "./AcademicCompetencySection";
import CareerCompetencySection from "./CareerCompetencySection";
import CommunityCompetencySection from "./CommunityCompetencySection";
import ChecklistSubmitButton from "./ChecklistSubmitButton";
import type { ChecklistQuestion, ChecklistResponseItem } from "@/app/types/checklist";
import { useState, useMemo } from "react";

interface ChecklistSectionProps {
    questions: ChecklistQuestion[];
}

export default function ChecklistSection({ questions }: ChecklistSectionProps) {
    // 질문 분류
    const academicQuestions = useMemo(
        () => questions.filter(q => q.main_category_id === 1),
        [questions]
    );
    const careerQuestions = useMemo(() => questions.filter(q => q.main_category_id === 2), [questions]);
    const communityQuestions = useMemo(() => questions.filter(q => q.main_category_id === 3), [questions]);

    // 전체 점수 상태: { [checklist_question_id]: score }
    const [scores, setScores] = useState<Record<number, number>>({});

    // 각 Section에 전달할 핸들러
    const handleScoreChange = (questionId: number, score: number) => {
        setScores(prev => ({ ...prev, [questionId]: score }));
    };

    // responses 변환
    const responses: ChecklistResponseItem[] = useMemo(
        () => Object.entries(scores).map(([id, score]) => ({ checklist_question_id: Number(id), score })),
        [scores]
    );

    return (
        <div className="flex flex-col space-y-4 w-full">
            <AcademicCompetencySection
                questions={academicQuestions}
                scores={scores}
                onScoreChange={handleScoreChange}
            />
            <CareerCompetencySection
                questions={careerQuestions}
                scores={scores}
                onScoreChange={handleScoreChange}
            />
            <CommunityCompetencySection
                questions={communityQuestions}
                scores={scores}
                onScoreChange={handleScoreChange}
            />
            <ChecklistSubmitButton responses={responses} />
        </div>
    );
}