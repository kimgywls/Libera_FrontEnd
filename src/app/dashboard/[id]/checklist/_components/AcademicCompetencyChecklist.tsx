import React from 'react';
import type { ChecklistQuestion, ChecklistScoreLabel } from '@/app/types/checklist';

interface AcademicCompetencyChecklistProps {
    scoreLabels: ChecklistScoreLabel[];
    scores: Record<number, number>;
    onScoreChange: (questionId: number, value: number) => void;
    groupedQuestions: Record<string, ChecklistQuestion[]>;
}

const SUB_CATEGORY_LABELS: Record<number, string> = {
    1: '학업성취도',
    2: '기초학업역량',
    3: '심화학업역량',
    4: '학업태도',
};

const AcademicCompetencyChecklist: React.FC<AcademicCompetencyChecklistProps> = ({
    scoreLabels,
    scores,
    onScoreChange,
    groupedQuestions,
}) => {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 text-black">
                <thead className="bg-gray-50">
                    <tr className="text-center">
                        <th className="border border-gray-300 px-3 py-2 w-1/4 font-semibold">세부항목</th>
                        <th className="border border-gray-300 px-3 py-2 font-semibold">평가질문</th>
                        {scoreLabels.map(score => (
                            <th key={score.value} className="border border-gray-300 px-2 py-2 font-medium">
                                {score.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(groupedQuestions).map(([subCategoryId, questions]) =>
                        questions.map((q, qIdx) => (
                            <tr key={q.checklist_question_id} className="hover:bg-gray-50">
                                {qIdx === 0 && (
                                    <td
                                        className="border border-gray-300 px-3 py-2 font-semibold text-gray-800 bg-gray-50 text-center align-middle"
                                        rowSpan={questions.length}
                                    >
                                        {SUB_CATEGORY_LABELS[Number(subCategoryId)]}
                                    </td>
                                )}
                                <td className="border border-gray-300 px-3 py-2 text-gray-700">
                                    <span className="leading-relaxed block whitespace-pre-line">{q.question_text}</span>
                                </td>
                                {scoreLabels.map(score => (
                                    <td key={score.value} className="border border-gray-300 text-center">
                                        <input
                                            type="radio"
                                            name={`question-${q.checklist_question_id}`}
                                            value={score.value}
                                            checked={scores[q.checklist_question_id] === score.value}
                                            onChange={() => onScoreChange(q.checklist_question_id, score.value)}
                                            className="accent-violet-600 w-4 h-4"
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AcademicCompetencyChecklist; 