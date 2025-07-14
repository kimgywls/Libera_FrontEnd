import type { FC } from 'react';
import { useCallback } from 'react';
import { ScoreForm, CreateScoreRequest } from '@/app/types/score';
import { useCreateScore } from '../../_hooks/use-create-score';
import { useScoreForm } from '../../_hooks/use-score-form';
import { convertAchievementDistributionForCreate, safeParseNumber } from '../../_utils/score-form-utils';
import BaseModal from '../../../../_components/_modal/BaseModal';
import ModalHeader from '../../../../_components/_modal/ModalHeader';
import ModalButtons from '../../../../_components/_modal/ModalButtons';
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
    const { mutate: createScore, isPending: isSaving } = useCreateScore();

    // 성적 폼 로직
    const { scoresForm, handleChange, handleAddSubject } = useScoreForm({
        grade,
        semester
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

    // 저장 함수
    const handleSaveForm = useCallback(() => {
        scoresForm.forEach((form) => {
            createScore(
                { studentId, score: toCreateScoreRequest(form) },
                {
                    onSuccess: () => {
                        onSuccess();
                        onClose();
                    },
                    onError: (error) => {
                        console.error('Error creating score:', error);
                    },
                }
            );
        });
    }, [createScore, scoresForm, studentId, onSuccess, onClose, toCreateScoreRequest]);

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            header={
                <ModalHeader
                    title="성적 추가"
                    subtitle={`${grade}학년 ${semester}학기 • ${scoresForm.length}개 과목`}
                    onClose={onClose}
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