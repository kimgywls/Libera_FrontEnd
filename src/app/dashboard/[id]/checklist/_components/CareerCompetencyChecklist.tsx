import type { ChecklistQuestion } from '@/app/types/checklist';
import BaseCompetencyChecklist from './BaseCompetencyChecklist';

const SCORE_LABELS = [
    { label: '탁월', value: 5 },
    { label: '우수', value: 4 },
    { label: '보통', value: 3 },
    { label: '미흡', value: 2 },
    { label: '부족', value: 1 },
]

const SUB_CATEGORY_LABELS: Record<number, string> = {
    5: '진로탐색활동과 경험',
    6: '진로탐색역량',
    7: '지식탐구역량',
    8: '문제해결능력',
};

interface Props {
    questions: ChecklistQuestion[];
    scores: Record<number, number>;
    onScoreChange: (questionId: number, score: number) => void;
}

export default function CareerCompetencyChecklist({ questions, scores, onScoreChange }: Props) {
    const groupedQuestions = questions.reduce<Record<string, ChecklistQuestion[]>>((acc, q) => {
        if (!acc[q.sub_category_id]) acc[q.sub_category_id] = [];
        acc[q.sub_category_id].push(q);
        return acc;
    }, {});
    return (
        <BaseCompetencyChecklist
            label="진로역량"
            scoreLabels={SCORE_LABELS}
            groupedQuestions={groupedQuestions}
            subCategoryLabels={SUB_CATEGORY_LABELS}
            scores={scores}
            onScoreChange={onScoreChange}
        />
    );
} 