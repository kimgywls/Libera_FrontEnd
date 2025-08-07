import type { ChecklistQuestion } from '@/app/types/checklist';
import { Check, ChevronRight } from 'lucide-react';

interface ScoreLabel {
    label: string;
    value: number;
}

interface ResultReportBaseCompetencyChecklistProps {
    label: string;
    scoreLabels: ScoreLabel[];
    groupedQuestions: Record<string, ChecklistQuestion[]>;
    subCategoryLabels: Record<number, string>;
    scores: Record<number, number>;
}

export default function ResultReportBaseCompetencyChecklist({
    label,
    scoreLabels,
    groupedQuestions,
    subCategoryLabels,
    scores,
}: ResultReportBaseCompetencyChecklistProps) {
    return (
        <div className="overflow-x-auto ">
            <div className="flex flex-row space-x-1 items-center mb-3">
                <ChevronRight strokeWidth={3} className="w-5 h-5" style={{ color: '#8e51ff' }} />
                <h2 className="text-xl font-semibold" style={{ color: '#7f22fe' }}>{label}</h2>
            </div>
            <table className="min-w-full divide-y text-black" style={{ borderColor: '#e5e7eb' }}>
                <thead style={{ backgroundColor: '#f5f3ff' }}>
                    <tr className="text-center">
                        <th className="border px-3 py-2 w-1/4 font-semibold" style={{ borderColor: '#d1d5db', color: '#101828' }}>세부항목</th>
                        <th className="border px-3 py-2 font-semibold" style={{ borderColor: '#d1d5db', color: '#101828' }}>평가질문</th>
                        {scoreLabels.map(score => (
                            <th key={score.value} className="border px-2 py-2 font-medium" style={{ borderColor: '#d1d5db', color: '#101828' }}>
                                {score.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(groupedQuestions).map(([subCategoryId, questions]) =>
                        questions.map((q, qIdx) => {
                            const questionScore = scores[q.checklist_question_id] || 0;
                            return (
                                <tr key={q.checklist_question_id} className="hover:bg-gray-50">
                                    {qIdx === 0 && (
                                        <td
                                            className="border px-3 py-2 font-semibold text-center align-middle"
                                            style={{ borderColor: '#d1d5db', backgroundColor: '#f5f3ff', color: '#364153' }}
                                            rowSpan={questions.length}
                                        >
                                            {subCategoryLabels[Number(subCategoryId)] || `카테고리 ${subCategoryId}`}
                                        </td>
                                    )}
                                    <td className="border px-3 py-2 w-[55%]" style={{ borderColor: '#d1d5db', color: '#374151' }}>
                                        <span className="leading-relaxed block whitespace-pre-line">{q.question_text}</span>
                                    </td>
                                    {scoreLabels.map(scoreLabel => (
                                        <td key={scoreLabel.value} className="border text-center" style={{ borderColor: '#d1d5db' }}>
                                            {questionScore === scoreLabel.value ? (
                                                <div className="flex items-center justify-center">
                                                    <Check strokeWidth={3} className="w-5 h-5" style={{ color: '#9333ea' }} />
                                                </div>
                                            ) : (
                                                <div className="w-5 h-5 mx-auto">
                                                    <div className="w-4 h-4 border-2 rounded-full mx-auto" style={{ borderColor: '#d1d5db' }}></div>
                                                </div>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
} 