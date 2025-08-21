"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

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
    const [isMetaSaved, setIsMetaSaved] = useState<boolean>(false);
    const { openModal, closeModal, isModalOpen } = useModalState();
    const [alert, setAlert] = useState({
        title: '',
        description: '',
        onConfirm: () => closeModal('meta-alert'),
    });
    const { data: resultData, refetch: refetchResult } = useChecklistResult(studentId);
    const { data: questionsData, isLoading: isQuestionsLoading } = useChecklistQuestions();
    const { data: detailedResult, isLoading: isDetailedLoading, isError: isDetailedError, refetch: refetchDetailed } = useChecklistDetailedResult(studentId);
    const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // 메타 정보가 로드되면 저장 상태 업데이트
    useEffect(() => {
        if (meta && meta.highschool_type && meta.is_subject_sequence_completed !== null && meta.is_subject_sequence_completed !== undefined) {
            setIsMetaSaved(true);
            setSchoolType(meta.highschool_type);
            setCurriculumCompleted(meta.is_subject_sequence_completed ? 'YES' : 'NO');
        } else {
            setIsMetaSaved(false);
        }
    }, [meta]);

    const handleSaveChecklistMeta = useCallback(async () => {
        if (!studentId) return;
        const now = new Date().toISOString();
        const body = {
            id: meta?.id ?? 0,
            highschool_type: schoolType === '' ? null : schoolType,
            is_subject_sequence_completed: curriculumCompleted === '' ? null : curriculumCompleted === 'YES',
            student_id: studentId,
            checklist_meta_id: meta?.checklist_meta_id ?? 0,
            created_at: meta?.created_at ?? now,
            updated_at: meta?.updated_at ?? now,
        };
        const res = await mutation.mutateAsync(body);
        if (res.success) {
            setIsMetaSaved(true);
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
    }, [studentId, schoolType, curriculumCompleted, meta, mutation, closeModal, openModal]);

    // 디바운스 자동 저장 기능 (메타 정보)
    useEffect(() => {
        // 메타 정보가 이미 저장되어 있으면 자동 저장 비활성화
        if (isMetaSaved) {
            return;
        }

        if (schoolType !== '' || curriculumCompleted !== '') {
            // 이전 타이머가 있다면 클리어
            if (autoSaveTimeoutRef.current) {
                clearTimeout(autoSaveTimeoutRef.current);
            }

            // 5초 후 자동 저장
            autoSaveTimeoutRef.current = setTimeout(() => {
                handleSaveChecklistMeta();
            }, 5000);
        }

        // 컴포넌트 언마운트 시 타이머 클리어
        return () => {
            if (autoSaveTimeoutRef.current) {
                clearTimeout(autoSaveTimeoutRef.current);
            }
        };
    }, [schoolType, curriculumCompleted, handleSaveChecklistMeta, isMetaSaved]);

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

            {!isMetaSaved ? (
                <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">학생 정보를 먼저 저장해주세요</h3>
                        <p className="text-gray-600 mb-4">체크리스트 평가를 시작하려면 위의 학생 정보를 저장해야 합니다.</p>
                        <div className="text-sm text-gray-500">
                            <p>• 고교 구분을 선택해주세요</p>
                            <p>• 개설 교과목 이수 여부를 선택해주세요</p>
                            <p>• 저장 버튼을 클릭해주세요</p>
                        </div>
                    </div>
                </div>
            ) : isQuestionsLoading ? (
                <div className="flex items-center justify-center p-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mx-auto mb-4"></div>
                        <p className="text-gray-500">체크리스트를 가져오는 중입니다</p>
                    </div>
                </div>
            ) : (
                <ChecklistSection
                    questions={questionsData!.questions}
                    onSubmissionSuccess={handleSubmissionSuccess}
                />
            )}

            {isMetaSaved && (
                <>
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
                </>
            )}
        </div>
    );
}