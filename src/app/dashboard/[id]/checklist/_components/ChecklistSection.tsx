import AcademicCompetencySection from "./AcademicCompetencySection";
import CareerCompetencySection from "./CareerCompetencySection";
import CommunityCompetencySection from "./CommunityCompetencySection";
import ChecklistSubmitButton from "./ChecklistSubmitButton";
import type { ChecklistQuestion, ChecklistResponseItem, ChecklistSubmitResponse } from "@/app/types/checklist";
import { useState, useMemo, useEffect } from "react";
import { useStudentInfoContext } from '@/app/dashboard/_contexts/StudentInfoContext';
import { useChecklistResponses } from '../_hooks/use-checklist-responses';

interface ChecklistSectionProps {
    questions: ChecklistQuestion[];
}

export default function ChecklistSection({ questions }: ChecklistSectionProps) {
    const { studentInfo } = useStudentInfoContext();
    const studentId = studentInfo.id;
    const { data: prevResponses } = useChecklistResponses(studentId);

    const academicQuestions = useMemo(
        () => questions.filter(q => q.main_category_id === 1),
        [questions]
    );
    const careerQuestions = useMemo(() => questions.filter(q => q.main_category_id === 2), [questions]);
    const communityQuestions = useMemo(() => questions.filter(q => q.main_category_id === 3), [questions]);

    const [scores, setScores] = useState<Record<number, number>>({});

    useEffect(() => {
        const safePrevResponses = prevResponses as ChecklistSubmitResponse | undefined;
        const responses = (safePrevResponses && Array.isArray((safePrevResponses as any).responses)) ? (safePrevResponses as any).responses : [];
        if (responses.length > 0) {
            const restored = Object.fromEntries(
                responses.map((r: ChecklistResponseItem) => [r.checklist_question_id, r.score])
            );
            setScores(restored);
        }
    }, [prevResponses]);

    const handleScoreChange = (questionId: number, score: number) => {
        setScores(prev => ({ ...prev, [questionId]: score }));
    };

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
            <ChecklistSubmitButton responses={responses} totalQuestions={questions.length} />
        </div>
    );
}