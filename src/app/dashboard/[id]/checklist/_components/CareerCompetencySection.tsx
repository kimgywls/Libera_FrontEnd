import CareerCompetencyChecklist from './CareerCompetencyChecklist';
import type { ChecklistQuestion } from '@/app/types/checklist';
import { CHECKLIST_SCORE_LABELS as SCORE_LABELS } from '@/app/constants';

interface CareerCompetencySectionProps {
    questions: ChecklistQuestion[];
    scores: Record<number, number>;
    onScoreChange: (questionId: number, score: number) => void;
}

export default function CareerCompetencySection({ questions, scores, onScoreChange }: CareerCompetencySectionProps) {
    // 카테고리별로 그룹화
    const groupedQuestions = questions.reduce<Record<string, ChecklistQuestion[]>>((acc, q) => {
        if (!acc[q.sub_category_id]) acc[q.sub_category_id] = [];
        acc[q.sub_category_id].push(q);
        return acc;
    }, {});

    return (
        <section className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">진로역량</h2>
            {Object.entries(groupedQuestions).map(([subId, questions]) => (
                <div key={subId} className="mb-4">
                    <CareerCompetencyChecklist
                        scoreLabels={SCORE_LABELS}
                        scores={scores}
                        onScoreChange={onScoreChange}
                        groupedQuestions={{ [subId]: questions }}
                    />
                </div>
            ))}
        </section>
    );
}
