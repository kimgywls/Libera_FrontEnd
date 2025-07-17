"use client";

import ChecklistMetaSection from './ChecklistMetaSection';
import ChecklistSection from './ChecklistSection';
import ChecklistScoreSummary from './ChecklistScoreSummary';
import { useChecklistMetaMutation, useChecklistMetaQuery } from '../_hooks/use-checklist-meta';
import { useChecklistQuestions } from '../_hooks/use-checklist-questions';
import { useStudentInfoContext } from '@/app/dashboard/_contexts/StudentInfoContext';
import { HighschoolTypeEnum } from '@/app/types/checklist';
import { useState } from 'react';
import { useModalState } from '@/app/hooks/useModalState';
import { useChecklistResult } from '../_hooks/use-checklist-result';

export default function ChecklistWidget() {
    const { studentInfo } = useStudentInfoContext();
    const studentId = studentInfo?.id;
    const { data: meta } = useChecklistMetaQuery(studentId);
    const mutation = useChecklistMetaMutation(studentId);
    const [schoolType, setSchoolType] = useState<HighschoolTypeEnum | ''>('');
    const [curriculumCompleted, setCurriculumCompleted] = useState<string>('');
    const { openModal, closeModal, isModalOpen } = useModalState();
    const [alert, setAlert] = useState({
        title: '',
        description: '',
        onConfirm: () => closeModal('meta-alert'),
    });
    const { data: resultData } = useChecklistResult(studentId);

    const handleSaveChecklistMeta = async () => {
        if (!studentId) return;
        const now = new Date().toISOString();
        const body = {
            highschool_type: schoolType === '' ? null : schoolType,
            is_subject_sequence_completed: curriculumCompleted === '' ? null : curriculumCompleted === 'YES',
            student_id: studentId,
            checklist_meta_id: meta?.checklist_meta_id ?? 0,
            created_at: meta?.created_at ?? now,
            updated_at: meta?.updated_at ?? now,
        };
        const res = await mutation.mutateAsync(body);
        if (res.success) {
            setAlert({
                title: '성공',
                description: res.message || '저장 성공',
                onConfirm: () => closeModal('meta-alert'),
            });
        } else {
            setAlert({
                title: '실패',
                description: res.message || '저장 실패',
                onConfirm: () => closeModal('meta-alert'),
            });
        }
        openModal('meta-alert');
    };

    const { data: questionsData, isLoading: isQuestionsLoading } = useChecklistQuestions();

    return (
        <div className="space-y-10 mb-8">
            <ChecklistMetaSection
                schoolType={schoolType}
                setSchoolType={setSchoolType}
                curriculumCompleted={curriculumCompleted}
                setCurriculumCompleted={setCurriculumCompleted}
                meta={meta!}
                alert={{
                    open: isModalOpen('meta-alert'),
                    title: alert.title,
                    description: alert.description,
                    onConfirm: alert.onConfirm,
                }}
                handleSave={handleSaveChecklistMeta}
            />

            {isQuestionsLoading ? (
                <div>체크리스트를 가져오는 중입니다</div>
            ) : (
                <ChecklistSection
                    questions={questionsData!.questions}
                />
            )}

            <ChecklistScoreSummary
                academicScore={resultData?.result_scores?.['학업역량'] ?? 0}
                careerScore={resultData?.result_scores?.['진로역량'] ?? 0}
                communityScore={resultData?.result_scores?.['공동체역량'] ?? 0}
            />
        </div>
    );
}