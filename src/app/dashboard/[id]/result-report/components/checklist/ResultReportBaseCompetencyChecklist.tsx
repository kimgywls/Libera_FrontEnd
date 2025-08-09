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
        <div className="overflow-x-auto">
            <div className="flex flex-row space-x-1 items-center mb-3">
                <ChevronRight strokeWidth={3} className="w-5 h-5" style={{ color: '#8e51ff' }} />
                <h2 className="text-xl font-semibold" style={{ color: '#7f22fe' }}>{label}</h2>
            </div>
            <table className="min-w-full divide-y text-black border rounded-lg" style={{ borderColor: '#e5e7eb' }}>
                <thead style={{ backgroundColor: '#f9fafb' }}>
                    <tr className="text-center">
                        <th className="border px-4 py-3 font-semibold w-[15%]" style={{ borderColor: '#e5e7eb', color: '#374151' }}>세부항목</th>
                        <th className="border px-4 py-3 font-semibold w-[55%]" style={{ borderColor: '#e5e7eb', color: '#374151' }}>평가질문</th>
                        {scoreLabels.map(score => (
                            <th key={score.value} className="border px-3 py-3 font-medium" style={{ borderColor: '#e5e7eb', color: '#374151' }}>
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
                                    {qIdx === 0 ? (
                                        <td
                                            className="border px-4 py-3 font-semibold text-center align-middle whitespace-nowrap"
                                            style={{ borderColor: '#e5e7eb', backgroundColor: '#f3f4f6', color: '#374151' }}
                                        >
                                            {subCategoryLabels[Number(subCategoryId)] || `카테고리 ${subCategoryId}`}
                                        </td>
                                    ) : (
                                        <td
                                            className="border px-4 py-3 text-center align-middle whitespace-nowrap"
                                            style={{ borderColor: '#e5e7eb', backgroundColor: '#f9fafb' }}
                                        >
                                        </td>
                                    )}
                                    <td className="border px-4 py-3 w-[55%]" style={{ borderColor: '#e5e7eb', color: '#374151' }}>
                                        <span className="leading-relaxed block whitespace-pre-line text-sm">{q.question_text}</span>
                                    </td>
                                    {scoreLabels.map(scoreLabel => (
                                        <td key={scoreLabel.value} className="border text-center py-3" style={{ borderColor: '#e5e7eb' }}>
                                            {questionScore === scoreLabel.value ? (
                                                <div className="flex items-center justify-center">
                                                    <Check strokeWidth={3} className="w-4 h-4" style={{ color: '#8e51ff' }} />
                                                </div>
                                            ) : (
                                                <div className="w-4 h-4 mx-auto">
                                                    <div className="w-3 h-3 border rounded-full mx-auto" style={{ borderColor: '#d1d5db' }}></div>
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