import CareerCompetencyChecklist from './ResultReportCareerCompetencyChecklist';
import type { ChecklistQuestion } from '@/app/types/checklist';

interface Props {
    questions: ChecklistQuestion[];
    responses: Record<number, number>;
}

export default function ResultReportCareerCompetencySection({ questions, responses }: Props) {
    return (
        <CareerCompetencyChecklist
            questions={questions}
            scores={responses}
        />
    );
}
