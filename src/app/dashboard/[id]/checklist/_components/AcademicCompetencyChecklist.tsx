import type { ChecklistQuestion } from '@/app/types/checklist';
import BaseCompetencyChecklist from './BaseCompetencyChecklist';

const SCORE_LABELS = [
    { label: '1', value: 5 },
    { label: '2', value: 4 },
    { label: '3', value: 3 },
    { label: '4', value: 2 },
    { label: '5', value: 1 },
];
const SUB_CATEGORY_LABELS: Record<number, string> = {
    1: '학업성취도',
    2: '기초학업역량',
    3: '심화학업역량',
    4: '학업태도',
};

interface Props {
    questions: ChecklistQuestion[];
    scores: Record<number, number>;
    onScoreChange: (questionId: number, score: number) => void;
}

export default function AcademicCompetencyChecklist({ questions, scores, onScoreChange }: Props) {
    const groupedQuestions = questions.reduce<Record<string, ChecklistQuestion[]>>((acc, q) => {
        if (!acc[q.sub_category_id]) acc[q.sub_category_id] = [];
        acc[q.sub_category_id].push(q);
        return acc;
    }, {});
    return (
        <BaseCompetencyChecklist
            label="학업역량"
            scoreLabels={SCORE_LABELS}
            groupedQuestions={groupedQuestions}
            subCategoryLabels={SUB_CATEGORY_LABELS}
            scores={scores}
            onScoreChange={onScoreChange}
        />
    );
} 