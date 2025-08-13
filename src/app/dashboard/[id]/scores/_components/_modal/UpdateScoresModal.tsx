import type { FC } from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';

import { ScoreForm, CreateScoreRequest } from '@/app/types/score';
import { AlertModal } from '@/app/components/modal/AlertModal';

import { useCreateScore } from '../../_hooks/use-create-score';
import { usePutBulkScores } from '../../_hooks/use-put-bulk-scores';
import { useDeleteSingleScore } from '../../_hooks/use-delete-single-score';
import { useScoreForm } from '../../_hooks/use-score-form';

import { DebouncedSave } from '../../_utils/debounced-save';
import { convertAchievementDistributionForCreate, safeParseNumber } from '../../_utils/score-form-utils';

import AutoSaveStatus from '../../../../_components/_modal/AutoSaveStatus';
import BaseModal from '../../../../_components/_modal/BaseModal';
import ModalButtons from '../../../../_components/_modal/ModalButtons';
import ModalHeader from '../../../../_components/_modal/ModalHeader';
import ScoresModalTable from './_contents/ScoresModalTable';

interface UpdateScoresModalProps {
    open: boolean;
    onClose: () => void;
    studentId: number;
    grade: number;
    semester: number;
    scores: ScoreForm[];
    onSuccess: () => void;
}

const UpdateScoresModal: FC<UpdateScoresModalProps> = ({
    open,
    onClose,
    studentId,
    grade,
    semester,
    scores,
    onSuccess
}) => {
    const [isAutoSaving, setIsAutoSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    // 삭제 확인 모달 상태
    const [deleteModal, setDeleteModal] = useState<{
        open: boolean;
        scoreIndex: number;
        scoreName: string;
    }>({
        open: false,
        scoreIndex: -1,
        scoreName: ''
    });

    // scoresForm을 ref로 참조하여 순환 의존성 해결
    const scoresFormRef = useRef<ScoreForm[]>([]);

    const { mutateAsync: saveScores, isPending: isSaving } = usePutBulkScores();
    const { mutateAsync: createScore, isPending: isCreating } = useCreateScore();
    const { mutateAsync: deleteScore, isPending: isDeleting } = useDeleteSingleScore();

    // 성적 폼 로직
    const { scoresForm, resetForm, handleChange, handleAddSubject, removeScore } = useScoreForm({
        initialScores: scores,
        grade,
        semester,
        onFormChange: () => debouncedSave()
    });

    // scoresForm이 변경될 때마다 ref 업데이트
    useEffect(() => {
        scoresFormRef.current = scoresForm;
    }, [scoresForm]);

    // ScoreForm -> CreateScoreRequest 변환
    const toCreateScoreRequest = useCallback((form: ScoreForm): CreateScoreRequest => ({
        grade: form.grade,
        semester: form.semester,
        subject_type: form.subject_type,
        curriculum: form.curriculum,
        subject: form.subject,
        raw_score: safeParseNumber(form.raw_score),
        subject_average: safeParseNumber(form.subject_average),
        standard_deviation: safeParseNumber(form.standard_deviation),
        achievement_level: form.achievement_level ?? '',
        student_count: form.student_count ? String(form.student_count) : null,
        grade_rank: form.grade_rank ?? '',
        achievement_distribution: convertAchievementDistributionForCreate(form.achievement_distribution),
        credit_hours: safeParseNumber(form.credit_hours),
        notes: form.notes ?? '',
        student_id: studentId,
    }), [studentId]);

    // 개별 성적 삭제 함수 - AlertModal 사용
    const handleDeleteScore = useCallback((idx: number) => {
        const scoreToDelete = scoresForm[idx];

        // AlertModal 열기
        setDeleteModal({
            open: true,
            scoreIndex: idx,
            scoreName: scoreToDelete.subject || '과목'
        });
    }, [scoresForm]);

    // 삭제 확인 처리
    const handleConfirmDelete = useCallback(async () => {
        const { scoreIndex } = deleteModal;
        const scoreToDelete = scoresForm[scoreIndex];

        // 모달 닫기
        setDeleteModal({
            open: false,
            scoreIndex: -1,
            scoreName: ''
        });

        // ID가 있는 경우 (저장된 성적) - 서버에서 삭제
        if (scoreToDelete?.id) {
            try {
                await deleteScore({
                    studentId,
                    scoreId: scoreToDelete.id
                });
            } catch (error) {
                console.error('성적 삭제 중 오류:', error);
                return; // 서버 삭제 실패 시 로컬 삭제도 취소
            }
        }

        // 로컬 상태에서 제거
        removeScore(scoreIndex);
    }, [deleteModal, scoresForm, deleteScore, studentId, removeScore]);

    // 삭제 취소 처리
    const handleCancelDelete = useCallback(() => {
        setDeleteModal({
            open: false,
            scoreIndex: -1,
            scoreName: ''
        });
    }, []);

    // 자동 저장 함수 (기존 성적만) - scoresForm 의존성 제거
    const handleAutoSave = useCallback(async () => {
        const currentScoresForm = scoresFormRef.current;
        const existingScores = currentScoresForm.filter(score => score.id);
        const newScores = currentScoresForm.filter(score => !score.id);

        // 저장할 성적이 없으면 리턴
        if (existingScores.length === 0 && newScores.length === 0) return;

        setIsAutoSaving(true);
        try {
            // 기존 성적 업데이트
            if (existingScores.length > 0) {
                await saveScores({ studentId, scores: existingScores });
            }

            // 새로운 성적 생성
            if (newScores.length > 0) {
                const createdScores = await Promise.all(
                    newScores.map(scoreForm =>
                        createScore({
                            studentId,
                            score: toCreateScoreRequest(scoreForm)
                        })
                    )
                );

                // 새로 생성된 성적의 ID를 로컬 상태에 반영
                const updatedScoresForm = [...currentScoresForm];
                let newScoreIndex = 0;

                for (let i = 0; i < updatedScoresForm.length; i++) {
                    if (!updatedScoresForm[i].id) {
                        // 새로 생성된 성적에 ID 할당
                        if (createdScores[newScoreIndex]?.id) {
                            updatedScoresForm[i] = {
                                ...updatedScoresForm[i],
                                id: createdScores[newScoreIndex].id
                            };
                        }
                        newScoreIndex++;
                    }
                }

                // 로컬 상태 업데이트
                scoresFormRef.current = updatedScoresForm;
            }

            // 실제 저장 성공 시에만 lastSaved 업데이트
            setLastSaved(new Date());
        } catch (error) {
            console.error('자동 저장 중 오류:', error);
            // 저장 실패 시 lastSaved 업데이트하지 않음
        } finally {
            setIsAutoSaving(false);
        }
    }, [saveScores, createScore, studentId, toCreateScoreRequest]);

    // 디바운스 자동 저장
    const { debouncedSave, cancelSave } = DebouncedSave({
        onSave: handleAutoSave,
        delay: 5000
    });

    // 모달 열림/닫힘 처리
    useEffect(() => {
        if (open) {
            resetForm();
            setLastSaved(null);
        } else {
            cancelSave();
            // 메인 모달이 닫힐 때 삭제 모달도 닫기
            setDeleteModal({
                open: false,
                scoreIndex: -1,
                scoreName: ''
            });
        }
    }, [open, resetForm, cancelSave]);

    // 최종 저장 함수
    const handleSaveForm = useCallback(async () => {
        cancelSave();

        try {
            const newScores = scoresForm.filter(score => !score.id);
            const existingScores = scoresForm.filter(score => score.id);

            // 새로운 성적 생성
            if (newScores.length > 0) {
                await Promise.all(
                    newScores.map(scoreForm =>
                        createScore({
                            studentId,
                            score: toCreateScoreRequest(scoreForm)
                        })
                    )
                );
            }

            // 기존 성적 업데이트
            if (existingScores.length > 0) {
                await saveScores({ studentId, scores: existingScores });
            }

            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error saving scores:', error);
        }
    }, [saveScores, createScore, studentId, scoresForm, onSuccess, onClose, cancelSave, toCreateScoreRequest]);

    const isLoading = isSaving || isCreating || isDeleting;

    return (
        <>
            <BaseModal
                open={open}
                onClose={onClose}
                header={
                    <ModalHeader
                        title="성적 입력"
                        subtitle={`${grade}학년 ${semester}학기 • ${scoresForm.length}개 과목`}
                        onClose={onClose}
                        rightContent={
                            <AutoSaveStatus
                                isAutoSaving={isAutoSaving}
                                lastSaved={lastSaved}
                            />
                        }
                    />
                }
                footer={
                    <ModalButtons
                        onCancel={onClose}
                        onSave={handleSaveForm}
                        isLoading={isLoading}
                        saveText="제출하기"
                        loadingText="제출 중..."
                    />
                }
            >
                <ScoresModalTable
                    scoresForm={scoresForm}
                    onChange={handleChange}
                    onAddSubject={handleAddSubject}
                    onDelete={handleDeleteScore}
                />
            </BaseModal>

            {/* 삭제 확인 모달 */}
            <AlertModal
                open={deleteModal.open}
                title="과목 삭제"
                description={`'${deleteModal.scoreName}' 과목을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`}
                confirmText="삭제"
                cancelText="취소"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </>
    );
};

export default UpdateScoresModal;