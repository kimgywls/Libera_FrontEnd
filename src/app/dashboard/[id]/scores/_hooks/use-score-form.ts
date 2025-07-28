import { useState, useCallback } from 'react';
import { ScoreForm } from '@/app/types/score';
import { handleScoreFormFieldChange } from '../_utils/score-form-utils';

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
    achievement_distribution: null,
    notes: '',
});

interface UseScoreFormProps {
    initialScores?: ScoreForm[];
    grade: number;
    semester: number;
    onFormChange?: () => void;
}

export function useScoreForm({ initialScores, grade, semester, onFormChange }: UseScoreFormProps) {
    const [scoresForm, setScoresForm] = useState<ScoreForm[]>(
        initialScores?.length ? initialScores : [DEFAULT_ROW(grade, semester)]
    );

    const handleChange = useCallback(
        (idx: number, field: keyof ScoreForm, value: ScoreForm[keyof ScoreForm]) => {
            setScoresForm(prev =>
                prev.map((row, i) => {
                    if (i !== idx) return row;
                    return handleScoreFormFieldChange(row, field, value);
                })
            );
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
        setScoresForm(initialScores?.length ? initialScores : [DEFAULT_ROW(grade, semester)]);
    }, [initialScores, grade, semester]);

    return {
        scoresForm,
        setScoresForm,
        handleChange,
        handleAddSubject,
        removeScore,
        resetForm
    };
} 