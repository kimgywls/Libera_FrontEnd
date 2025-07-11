import { useQuery } from '@tanstack/react-query';
import { fetchChecklistQuestions } from '../_actions/fetch-checklist-questions';
import type { ChecklistQuestionsResponse } from '@/app/types/checklist';

export function useChecklistQuestions() {
    return useQuery<ChecklistQuestionsResponse>({
        queryKey: ['checklistQuestions'],
        queryFn: fetchChecklistQuestions,
    });
} 