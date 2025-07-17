import CommunityCompetencyChecklist from './CommunityCompetencyChecklist';
import type { ChecklistQuestion } from '@/app/types/checklist';

interface Props {
    questions: ChecklistQuestion[];
    scores: Record<number, number>;
    onScoreChange: (questionId: number, score: number) => void;
}

export default function CommunityCompetencySection(props: Props) {
    return <CommunityCompetencyChecklist {...props} />;
}
