import { useState, useMemo, useEffect, useCallback, useRef } from "react";

import type { ChecklistQuestion, ChecklistResponseItem, ChecklistSubmitResponse } from "@/app/types/checklist";
import { useStudentInfoContext } from '@/app/contexts/StudentInfoContext';

import { useChecklistResponses } from '../_hooks/use-checklist-responses';
import { useChecklistSubmit } from '../_hooks/use-checklist-submit';

import AcademicCompetencySection from "./AcademicCompetencySection";
import CareerCompetencySection from "./CareerCompetencySection";
import ChecklistSubmitButton from "./ChecklistSubmitButton";
import CommunityCompetencySection from "./CommunityCompetencySection";

interface ChecklistSectionProps {
    questions: ChecklistQuestion[];
    onSubmissionSuccess?: () => void;
}

export default function ChecklistSection({ questions, onSubmissionSuccess }: ChecklistSectionProps) {
    const { studentInfo } = useStudentInfoContext();
    const studentId = studentInfo!.id;
    const { data: prevResponses } = useChecklistResponses(studentId);
    const submitMutation = useChecklistSubmit();
    const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const academicQuestions = useMemo(
        () => questions.filter(q => q.main_category_id === 1),
        [questions]
    );
    const careerQuestions = useMemo(() => questions.filter(q => q.main_category_id === 2), [questions]);
    const communityQuestions = useMemo(() => questions.filter(q => q.main_category_id === 3), [questions]);

    const [scores, setScores] = useState<Record<number, number>>({});

    useEffect(() => {
        const safePrevResponses = prevResponses as ChecklistSubmitResponse | undefined;
        const responses = (safePrevResponses && Array.isArray(safePrevResponses.responses)) ? safePrevResponses.responses : [];
        if (responses.length > 0) {
            const restored = Object.fromEntries(
                responses.map((r: ChecklistResponseItem) => [r.checklist_question_id, r.score])
            );
            setScores(restored);
        }
    }, [prevResponses]);



    // 디바운스 자동 저장 기능
    useEffect(() => {
        if (Object.keys(scores).length > 0) {
            // 이전 타이머가 있다면 클리어
            if (autoSaveTimeoutRef.current) {
                clearTimeout(autoSaveTimeoutRef.current);
            }

            // 5초 후 자동 저장
            autoSaveTimeoutRef.current = setTimeout(() => {
                const responses: ChecklistResponseItem[] = Object.entries(scores).map(([id, score]) => ({
                    checklist_question_id: Number(id),
                    score
                }));

                if (responses.length > 0) {
                    submitMutation.mutate({
                        student_id: studentId,
                        responses
                    });
                }
            }, 5000);
        }

        // 컴포넌트 언마운트 시 타이머 클리어
        return () => {
            if (autoSaveTimeoutRef.current) {
                clearTimeout(autoSaveTimeoutRef.current);
            }
        };
    }, [scores, studentId, submitMutation]);

    const handleScoreChange = useCallback((questionId: number, score: number) => {
        setScores(prev => ({ ...prev, [questionId]: score }));
    }, []);

    const responses: ChecklistResponseItem[] = useMemo(
        () => Object.entries(scores).map(([id, score]) => ({ checklist_question_id: Number(id), score })),
        [scores]
    );

    const handleSubmissionSuccess = useCallback(() => {
        // 자동 저장 타이머 클리어
        if (autoSaveTimeoutRef.current) {
            clearTimeout(autoSaveTimeoutRef.current);
        }
        onSubmissionSuccess?.();
    }, [onSubmissionSuccess]);

    return (
        <div className="flex flex-col space-y-4 w-full">
            <div id="academic-section">
                <AcademicCompetencySection
                    questions={academicQuestions}
                    scores={scores}
                    onScoreChange={handleScoreChange}
                />
            </div>
            <div id="career-section">
                <CareerCompetencySection
                    questions={careerQuestions}
                    scores={scores}
                    onScoreChange={handleScoreChange}
                />
            </div>
            <div id="community-section">
                <CommunityCompetencySection
                    questions={communityQuestions}
                    scores={scores}
                    onScoreChange={handleScoreChange}
                />
            </div>

            <ChecklistSubmitButton
                responses={responses}
                totalQuestions={questions.length}
                onSuccess={handleSubmissionSuccess}
            />
        </div>
    );
}