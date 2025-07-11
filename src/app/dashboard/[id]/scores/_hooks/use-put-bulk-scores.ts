import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putBulkScores } from '../_actions/put-bulk-scores';
import type { ScoreForm } from '@/app/types/score';

export function usePutBulkScores() {
    const queryClient = useQueryClient();
    const {
        mutate,
        isPending,
        error,
    } = useMutation({
        mutationFn: ({ studentId, scores }: { studentId: number; scores: ScoreForm[] }) =>
            putBulkScores(studentId, scores),
        onSuccess: (newScores, { studentId }) => {
            queryClient.setQueryData(['studentScores', studentId], newScores);
        },
    });
    return { mutate, isPending, error };
} 