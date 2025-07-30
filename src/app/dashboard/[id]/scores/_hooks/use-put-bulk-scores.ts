import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ScoreForm } from '@/app/types/score';

import { putBulkScores } from '../_actions/put-bulk-scores';

export function usePutBulkScores() {
    const queryClient = useQueryClient();
    const {
        mutate,
        mutateAsync,
        isPending,
        error,
    } = useMutation({
        mutationFn: ({ studentId, scores }: { studentId: number; scores: ScoreForm[] }) =>
            putBulkScores(studentId, scores),
        onSuccess: ({ studentId }) => {
            // 성적 데이터 쿼리 무효화
            queryClient.invalidateQueries({ 
                queryKey: ['student-scores', studentId],
                refetchType: 'all'
            });

            // 관련 쿼리들도 무효화
            queryClient.invalidateQueries({ 
                queryKey: ['overall-gpa', studentId],
                refetchType: 'all'
            });
            queryClient.invalidateQueries({ 
                queryKey: ['semester-trend', studentId],
                refetchType: 'all'
            });
        },
    });
    return { mutate, mutateAsync, isPending, error };
} 