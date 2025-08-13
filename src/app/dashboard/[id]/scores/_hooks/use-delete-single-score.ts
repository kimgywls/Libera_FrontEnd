import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteSingleScore } from '../_actions/delete-single-score';

interface DeleteScoreParams {
    studentId: number;
    scoreId: number;
}

export function useDeleteSingleScore() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ studentId, scoreId }: DeleteScoreParams) =>
            deleteSingleScore(studentId, scoreId),
        onMutate: async ({ studentId, scoreId }) => {
            // 이전 데이터 백업
            await queryClient.cancelQueries({ queryKey: ['student-scores', studentId] });
            const previousScores = queryClient.getQueryData(['student-scores', studentId]);

            // 낙관적 업데이트 - 해당 성적 제거
            queryClient.setQueryData(['student-scores', studentId], (old: any) => {
                if (!old?.scores) return old;

                return {
                    ...old,
                    scores: old.scores.filter((score: any) => score.id !== scoreId)
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
            queryClient.invalidateQueries({ queryKey: ['student-scores', studentId] });
        },
    });
} 