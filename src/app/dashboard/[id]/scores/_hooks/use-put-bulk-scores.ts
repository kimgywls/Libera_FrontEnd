import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ScoreForm, ScoresResponse } from '@/app/types/score';

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
        onSuccess: (apiResponse, { studentId, scores }) => {
            // 현재 캐시 데이터 가져오기
            const currentData = queryClient.getQueryData<ScoresResponse>(['student-scores', studentId]);

            if (currentData?.scores) {
                // 업데이트된 성적들로 기존 데이터 교체
                const updatedScores = currentData.scores.map((existingScore) => {
                    const updatedScore = scores.find(s => s.id === existingScore.id);
                    if (updatedScore) {
                        return { ...existingScore, ...updatedScore } as typeof existingScore;
                    }
                    return existingScore;
                });

                // 캐시 직접 업데이트
                queryClient.setQueryData<ScoresResponse>(['student-scores', studentId], {
                    ...currentData,
                    scores: updatedScores
                });
            }

            // 관련 쿼리들은 무효화만 (GPA, 트렌드 등)
            queryClient.invalidateQueries({ queryKey: ['overall-gpa', studentId] });
            queryClient.invalidateQueries({ queryKey: ['semester-trend', studentId] });
        },
    });
    return { mutate, mutateAsync, isPending, error };
} 