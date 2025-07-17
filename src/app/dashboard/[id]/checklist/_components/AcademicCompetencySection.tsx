import AcademicCompetencyChecklist from './AcademicCompetencyChecklist';
import type { ChecklistQuestion } from '@/app/types/checklist';

interface Props {
    questions: ChecklistQuestion[];
    scores: Record<number, number>;
    onScoreChange: (questionId: number, score: number) => void;
}

export default function AcademicCompetencySection(props: Props) {
    return <AcademicCompetencyChecklist {...props} />;
}
