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
        onSuccess: (newScore, { studentId }) => {
            const prev = queryClient.getQueryData<any[]>(['studentScores', studentId]) ?? [];
            queryClient.setQueryData(['studentScores', studentId], [...prev, newScore]);
        },
    });
} 