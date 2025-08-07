import AcademicCompetencyChecklist from './ResultReportAcademicCompetencyChecklist';
import type { ChecklistQuestion } from '@/app/types/checklist';

interface Props {
    questions: ChecklistQuestion[];
    responses: Record<number, number>;
}

export default function ResultReportAcademicCompetencySection({ questions, responses }: Props) {
    return (
        <AcademicCompetencyChecklist
            questions={questions}
            scores={responses}
        />
    );
}
