import { useMutation } from '@tanstack/react-query';
import { putBulkScores } from '../_actions/put-bulk-scores';
import type { ScoreForm } from '@/app/types/score';

export function usePutBulkScores() {
    const {
        mutate,
        isPending,
        error,
    } = useMutation({
        mutationFn: ({ studentId, scores }: { studentId: number; scores: ScoreForm[] }) =>
            putBulkScores(studentId, scores),
    });
    return { mutate, isPending, error };
} 