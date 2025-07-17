import CareerCompetencyChecklist from './CareerCompetencyChecklist';
import type { ChecklistQuestion } from '@/app/types/checklist';

interface Props {
    questions: ChecklistQuestion[];
    scores: Record<number, number>;
    onScoreChange: (questionId: number, score: number) => void;
}

export default function CareerCompetencySection(props: Props) {
    return <CareerCompetencyChecklist {...props} />;
}
