import { useState, useCallback } from 'react';
import { ScoreForm } from '@/app/types/score';
import { handleScoreFormFieldChange, safeParseNumber } from '../_utils/score-form-utils';

const DEFAULT_ROW = (grade: number, semester: number): ScoreForm => ({
    grade,
    semester,
    subject_type: '일반선택',
    curriculum: '',
    subject: '',
    raw_score: null,
    subject_average: null,
    credit_hours: null,
    student_count: null,
    grade_rank: '',
    achievement_level: '',
    standard_deviation: null,
    achievement_distribution: { A: 0, B: 0, C: 0 },
    notes: '',
});

interface UseScoreFormProps {
    initialScores?: ScoreForm[];
    grade: number;
    semester: number;
    onFormChange?: () => void;
}

export function useScoreForm({ initialScores, grade, semester, onFormChange }: UseScoreFormProps) {
    // 초기 데이터 타입 변환
    const transformInitialScores = useCallback((scores: ScoreForm[]): ScoreForm[] => {
        return scores.map(score => ({
            ...score,
            raw_score: safeParseNumber(score.raw_score),
            subject_average: safeParseNumber(score.subject_average),
            standard_deviation: safeParseNumber(score.standard_deviation),
            credit_hours: safeParseNumber(score.credit_hours),
            student_count: score.student_count ? String(score.student_count) : null,
            achievement_distribution: score.achievement_distribution
        }));
    }, []);

    const [scoresForm, setScoresForm] = useState<ScoreForm[]>(
        initialScores?.length ? transformInitialScores(initialScores) : [DEFAULT_ROW(grade, semester)]
    );

    const handleChange = useCallback(
        (idx: number, field: keyof ScoreForm, value: ScoreForm[keyof ScoreForm]) => {
            setScoresForm(prev => {
                const newForm = prev.map((row, i) => {
                    if (i !== idx) return row;
                    return handleScoreFormFieldChange(row, field, value);
                });
                return newForm;
            });
            onFormChange?.();
        },
        [onFormChange]
    );

    const handleAddSubject = useCallback(() => {
        setScoresForm(prev => [...prev, DEFAULT_ROW(grade, semester)]);
        onFormChange?.();
    }, [grade, semester, onFormChange]);

    const removeScore = useCallback((idx: number) => {
        setScoresForm(prev => prev.filter((_, i) => i !== idx));
        onFormChange?.();
    }, [onFormChange]);

    const resetForm = useCallback(() => {
        setScoresForm(initialScores?.length ? transformInitialScores(initialScores) : [DEFAULT_ROW(grade, semester)]);
    }, [initialScores, grade, semester, transformInitialScores]);

    return {
        scoresForm,
        setScoresForm,
        handleChange,
        handleAddSubject,
        removeScore,
        resetForm
    };
} 