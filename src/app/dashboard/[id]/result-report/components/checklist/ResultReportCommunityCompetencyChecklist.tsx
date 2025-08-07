import type { ChecklistQuestion } from '@/app/types/checklist';
import ResultReportBaseCompetencyChecklist from './ResultReportBaseCompetencyChecklist';
import { CHECKLIST_SUB_CATEGORY_LABELS } from '@/app/constants';

const SCORE_LABELS = [
    { label: 'O', value: 5 },
    { label: 'X', value: 3 },
];

interface Props {
    questions: ChecklistQuestion[];
    scores: Record<number, number>;
}

export default function ResultReportCommunityCompetencyChecklist({ questions, scores }: Props) {
    const groupedQuestions = questions.reduce<Record<string, ChecklistQuestion[]>>((acc, q) => {
        if (!acc[q.sub_category_id]) acc[q.sub_category_id] = [];
        acc[q.sub_category_id].push(q);
        return acc;
    }, {});

    return (
        <ResultReportBaseCompetencyChecklist
            label="공동체역량"
            scoreLabels={SCORE_LABELS}
            groupedQuestions={groupedQuestions}
            subCategoryLabels={CHECKLIST_SUB_CATEGORY_LABELS}
            scores={scores}
        />
    );
}