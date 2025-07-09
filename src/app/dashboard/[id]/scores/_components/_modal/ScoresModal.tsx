import type { FC } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Loader2, X } from 'lucide-react';
import { ScoreForm } from '@/app/types/score';
import { usePutBulkScores } from '../../_hooks/use-put-bulk-scores';
import ScoresModalTable from './_contents/ScoresModalTable';


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
    achievement_distribution: '',
    notes: '',
});

interface ScoresModalProps {
    open: boolean;
    onClose: () => void;
    studentId: number;
    grade: number;
    semester: number;
    scores: ScoreForm[];
    onSuccess: () => void;
}

const ScoresModal: FC<ScoresModalProps> = ({
    open,
    onClose,
    studentId,
    grade,
    semester,
    scores,
    onSuccess
}) => {
    const [scoresForm, setScoresForm] = useState<ScoreForm[]>(scores.length ? scores : [DEFAULT_ROW(grade, semester)]);
    const { mutate: saveScores, isLoading: isSaving } = usePutBulkScores();

    useEffect(() => {
        if (open) {
            setScoresForm(scores.length ? scores : [DEFAULT_ROW(grade, semester)]);
        }
    }, [open, scores, grade, semester]);

    const handleChange = useCallback(
        (idx: number, field: keyof ScoreForm, value: ScoreForm[keyof ScoreForm]) => {
            setScoresForm(prev =>
                prev.map((row, i) => {
                    if (i !== idx) return row;
                    if (
                        [
                            'raw_score',
                            'subject_average',
                            'credit_hours',
                            'student_count',
                            'standard_deviation',
                        ].includes(field)
                    ) {
                        return { ...row, [field]: value === '' ? null : Number(value) };
                    }
                    return { ...row, [field]: value };
                })
            );
        },
        []
    );

    const handleAddSubject = useCallback(() => {
        setScoresForm(prev => [...prev, DEFAULT_ROW(grade, semester)]);
    }, [grade, semester]);

    const handleSaveForm = useCallback(async () => {
        try {
            await saveScores(studentId, scoresForm);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error saving scores:', error);
        }
    }, [saveScores, studentId, scoresForm, onSuccess, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-md w-full max-w-7xl max-h-[95vh] flex flex-col overflow-hidden">
                {/* 헤더 */}
                <div className="bg-violet-100 border-b border-gray-200 px-8 pt-6 pb-4 text-black">
                    <div className="flex items-center justify-between text-black">
                        <div className="text-black">
                            <h2 className="text-2xl font-bold mb-1">성적 입력</h2>
                            <p className="text-gray-500 text-sm">
                                {grade}학년 {semester}학기 • {scoresForm.length}개 과목
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-2 hover:bg-white hover:bg-opacity-20 rounded-full"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* 컨텐츠 영역 */}
                <div className="flex-1 overflow-auto pb-3">
                    <ScoresModalTable
                        scoresForm={scoresForm}
                        onChange={handleChange}
                        onAddSubject={handleAddSubject}
                    />
                </div>

                {/* 하단 버튼 영역 */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
                    <div className="flex justify-end space-x-3">
                        <button
                            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                            onClick={onClose}
                            disabled={isSaving}
                        >
                            취소
                        </button>
                        <button
                            className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:bg-violet-400 transition-all duration-200 font-medium flex items-center"
                            onClick={handleSaveForm}
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                                    제출 중...
                                </>
                            ) : (
                                '제출하기'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScoresModal;