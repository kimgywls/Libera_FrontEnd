import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createScore } from '../_actions/create-score';
import type { CreateScoreRequest } from '@/app/types/score';

interface CreateScoreParams {
    studentId: number;
    score: CreateScoreRequest;
}

export function useCreateScore() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ studentId, score }: CreateScoreParams) =>
            createScore(studentId, score),
        onSuccess: (_data, variables) => {
            // 정확히 ['student-scores', studentId] 쿼리키를 무효화
            queryClient.invalidateQueries({ queryKey: ['student-scores', variables.studentId] });
        },
    });
} 