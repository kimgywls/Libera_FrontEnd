import type { ChecklistQuestion } from '@/app/types/checklist';
import BaseCompetencyChecklist from './ResultReportBaseCompetencyChecklist';
import { CHECKLIST_SUB_CATEGORY_LABELS } from '@/app/constants';

const SCORE_LABELS = [
    { label: '탁월', value: 5 },
    { label: '우수', value: 4 },
    { label: '보통', value: 3 },
    { label: '미흡', value: 2 },
    { label: '부족', value: 1 },
];

interface Props {
    questions: ChecklistQuestion[];
    scores: Record<number, number>;
}

export default function AcademicCompetencyChecklist({ questions, scores }: Props) {
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
            subCategoryLabels={CHECKLIST_SUB_CATEGORY_LABELS}
            scores={scores}
        />
    );
} 