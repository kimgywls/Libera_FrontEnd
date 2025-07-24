import { useQuery } from '@tanstack/react-query';

import type { ChecklistQuestionsResponse } from '@/app/types/checklist';

import { fetchChecklistQuestions } from '../_actions/fetch-checklist-questions';

export function useChecklistQuestions() {
    return useQuery<ChecklistQuestionsResponse>({
        queryKey: ['checklistQuestions'],
        queryFn: fetchChecklistQuestions,
    });
} 