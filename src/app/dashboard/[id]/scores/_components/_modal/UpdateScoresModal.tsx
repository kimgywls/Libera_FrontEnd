import type { FC } from 'react';
import { useState, useEffect, useCallback } from 'react';

import { ScoreForm, CreateScoreRequest } from '@/app/types/score';

import { useCreateScore } from '../../_hooks/use-create-score';
import { usePutBulkScores } from '../../_hooks/use-put-bulk-scores';
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

    const { mutateAsync: saveScores, isPending: isSaving } = usePutBulkScores();
    const { mutateAsync: createScore, isPending: isCreating } = useCreateScore();

    // 성적 폼 로직
    const { scoresForm, resetForm, handleChange, handleAddSubject } = useScoreForm({
        initialScores: scores,
        grade,
        semester,
        onFormChange: () => debouncedSave()
    });

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

    // 자동 저장 함수 (기존 성적만)
    const handleAutoSave = useCallback(async () => {
        const existingScores = scoresForm.filter(score => score.id);
        if (existingScores.length === 0) return;

        setIsAutoSaving(true);
        try {
            await saveScores({ studentId, scores: existingScores });
            setLastSaved(new Date());
            onSuccess();
        } catch (error) {
            console.error('자동 저장 중 오류:', error);
        } finally {
            setIsAutoSaving(false);
        }
    }, [saveScores, studentId, scoresForm, onSuccess]);

    // 디바운스 자동 저장
    const { debouncedSave, cancelSave } = DebouncedSave({
        onSave: handleAutoSave,
        delay: 10000
    });

    // 모달 열림/닫힘 처리
    useEffect(() => {
        if (open) {
            resetForm();
            setLastSaved(null);
        } else {
            cancelSave();
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

    const isLoading = isSaving || isCreating;

    return (
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
            />
        </BaseModal>
    );
};

export default UpdateScoresModal;