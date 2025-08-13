import type { FC } from 'react';
import { useCallback, useState, useEffect, useRef } from 'react';

import { ScoreForm, CreateScoreRequest } from '@/app/types/score';

import { useCreateScore } from '../../_hooks/use-create-score';
import { useScoreForm } from '../../_hooks/use-score-form';

import { convertAchievementDistributionForCreate, safeParseNumber } from '../../_utils/score-form-utils';
import { DebouncedSave } from '../../_utils/debounced-save';

import AutoSaveStatus from '../../../../_components/_modal/AutoSaveStatus';
import BaseModal from '../../../../_components/_modal/BaseModal';
import ModalButtons from '../../../../_components/_modal/ModalButtons';
import ModalHeader from '../../../../_components/_modal/ModalHeader';
import ScoresModalTable from './_contents/ScoresModalTable';

interface CreateScoresModalProps {
    open: boolean;
    onClose: () => void;
    studentId: number;
    grade: number;
    semester: number;
    onSuccess: () => void;
}

const CreateScoresModal: FC<CreateScoresModalProps> = ({
    open,
    onClose,
    studentId,
    grade,
    semester,
    onSuccess,
}) => {
    const [isAutoSaving, setIsAutoSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    // scoresForm을 ref로 참조하여 순환 의존성 해결
    const scoresFormRef = useRef<ScoreForm[]>([]);

    const { mutateAsync: createScore, isPending: isSaving } = useCreateScore();

    // 성적 폼 로직
    const { scoresForm, handleChange, handleAddSubject } = useScoreForm({
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

    // 자동 저장 함수
    const handleAutoSave = useCallback(async () => {
        const currentScoresForm = scoresFormRef.current;
        const validScores = currentScoresForm.filter(score =>
            score.subject && score.subject.trim() !== ''
        );

        if (validScores.length === 0) return;

        setIsAutoSaving(true);
        try {
            await Promise.all(
                validScores.map(scoreForm =>
                    createScore({
                        studentId,
                        score: toCreateScoreRequest(scoreForm)
                    })
                )
            );

            // 실제 저장 성공 시에만 lastSaved 업데이트
            setLastSaved(new Date());
        } catch (error) {
            console.error('자동 저장 중 오류:', error);
            // 저장 실패 시 lastSaved 업데이트하지 않음
        } finally {
            setIsAutoSaving(false);
        }
    }, [createScore, studentId, toCreateScoreRequest]);

    // 디바운스 자동 저장
    const { debouncedSave, cancelSave } = DebouncedSave({
        onSave: handleAutoSave,
        delay: 5000
    });

    // 모달 열림/닫힘 처리
    useEffect(() => {
        if (open) {
            setLastSaved(null);
        } else {
            cancelSave();
        }
    }, [open, cancelSave]);

    // 저장 함수
    const handleSaveForm = useCallback(async () => {
        cancelSave();

        try {
            await Promise.all(
                scoresForm.map(scoreForm =>
                    createScore({
                        studentId,
                        score: toCreateScoreRequest(scoreForm)
                    })
                )
            );

            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error creating scores:', error);
        }
    }, [createScore, scoresForm, studentId, onSuccess, onClose, cancelSave, toCreateScoreRequest]);

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            header={
                <ModalHeader
                    title="성적 추가"
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
                    isLoading={isSaving}
                    saveText="저장하기"
                    loadingText="저장 중..."
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

export default CreateScoresModal; 