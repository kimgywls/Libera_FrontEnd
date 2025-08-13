import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ScoreForm, Score, ScoresResponse } from '@/app/types/score';

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
        onMutate: async ({ studentId, scores }) => {
            // 이전 데이터 백업
            await queryClient.cancelQueries({ queryKey: ['student-scores', studentId] });
            const previousScores = queryClient.getQueryData(['student-scores', studentId]);

            // 낙관적 업데이트
            queryClient.setQueryData(['student-scores', studentId], (old: ScoresResponse | undefined) => {
                if (!old?.scores) return old;

                const updatedScores = old.scores.map((existingScore: Score) => {
                    const updatedScore = scores.find(s => s.id === existingScore.id);
                    if (updatedScore) {
                        return {
                            ...existingScore,
                            ...updatedScore,
                            updated_at: new Date().toISOString()
                        };
                    }
                    return existingScore;
                });

                return {
                    ...old,
                    scores: updatedScores
                };
            });

            return { previousScores };
        },
        onError: (_err, { studentId }, context) => {
            // 에러 시 이전 데이터로 롤백
            if (context?.previousScores) {
                queryClient.setQueryData(['student-scores', studentId], context.previousScores);
            }
        },
        onSettled: (_data, _error, { studentId }) => {
            // 성공/실패 관계없이 최신 데이터로 동기화
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