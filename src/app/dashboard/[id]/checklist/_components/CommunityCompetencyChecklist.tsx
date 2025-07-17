import type { ChecklistQuestion } from '@/app/types/checklist';
import BaseCompetencyChecklist from './BaseCompetencyChecklist';

const SCORE_LABELS = [
    { label: 'O', value: 5 },
    { label: 'X', value: 3 },
];
const SUB_CATEGORY_LABELS: Record<number, string> = {
    9: '협업과 소통능력',
    10: '리더십',
    11: '성실성 및 책임감',
    12: '나눔과 배려',
    13: '의사소통능력',
};

interface Props {
    questions: ChecklistQuestion[];
    scores: Record<number, number>;
    onScoreChange: (questionId: number, score: number) => void;
}

export default function CommunityCompetencyChecklist({ questions, scores, onScoreChange }: Props) {
    const groupedQuestions = questions.reduce<Record<string, ChecklistQuestion[]>>((acc, q) => {
        if (!acc[q.sub_category_id]) acc[q.sub_category_id] = [];
        acc[q.sub_category_id].push(q);
        return acc;
    }, {});

    return (
        <BaseCompetencyChecklist
            label="공동체역량"
            scoreLabels={SCORE_LABELS}
            groupedQuestions={groupedQuestions}
            subCategoryLabels={SUB_CATEGORY_LABELS}
            scores={scores}
            onScoreChange={onScoreChange}
        />
    );
}