"use client";

import { useState } from 'react';

import { HighschoolTypeEnum } from '@/app/types/checklist';
import { useStudentInfoContext } from '@/app/contexts/StudentInfoContext';
import { useModalState } from '@/app/hooks/useModalState';

import { useChecklistDetailedResult } from '../_hooks/use-checklist-detailed-result';
import { useChecklistMetaMutation, useChecklistMetaQuery } from '../_hooks/use-checklist-meta';
import { useChecklistQuestions } from '../_hooks/use-checklist-questions';
import { useChecklistResult } from '../_hooks/use-checklist-result';

import ChecklistMetaSection from './ChecklistMetaSection';
import ChecklistScoreChart from './ChecklistScoreChart';
import ChecklistScoreSummary from './ChecklistScoreSummary';
import ChecklistSection from './ChecklistSection';


export default function ChecklistWidget() {
    const { studentInfo } = useStudentInfoContext();
    const studentId = studentInfo?.id || 0;
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
    const { data: resultData, refetch: refetchResult } = useChecklistResult(studentId);
    const { data: questionsData, isLoading: isQuestionsLoading } = useChecklistQuestions();
    const { data: detailedResult, isLoading: isDetailedLoading, isError: isDetailedError, refetch: refetchDetailed } = useChecklistDetailedResult(studentId);

    // 학생 정보가 로딩 중인 경우 로딩 상태 표시
    if (!studentInfo) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-500">학생 정보를 불러오는 중...</p>
                </div>
            </div>
        );
    }

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

    const handleSubmissionSuccess = () => {
        // 제출 성공 시 관련 데이터를 다시 불러옴
        refetchResult();
        refetchDetailed();
    };

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
                    onSubmissionSuccess={handleSubmissionSuccess}
                />
            )}

            <div id="checklist-score-summary-section">
                <ChecklistScoreSummary
                    academicScore={resultData?.result_scores?.['학업역량'] ?? 0}
                    careerScore={resultData?.result_scores?.['진로역량'] ?? 0}
                    communityScore={resultData?.result_scores?.['공동체역량'] ?? 0}
                    totalScore={resultData?.result_scores?.['total'] ?? 0}
                />
            </div>

            <ChecklistScoreChart
                data={detailedResult!}
                isLoading={isDetailedLoading}
                isError={isDetailedError}
            />


        </div>
    );
}