import CommunityCompetencyChecklist from './ResultReportCommunityCompetencyChecklist';
import type { ChecklistQuestion } from '@/app/types/checklist';

interface Props {
    questions: ChecklistQuestion[];
    responses: Record<number, number>;
}

export default function ResultReportCommunityCompetencySection({ questions, responses }: Props) {
    return (
        <CommunityCompetencyChecklist
            questions={questions}
            scores={responses}
        />
    );
}
