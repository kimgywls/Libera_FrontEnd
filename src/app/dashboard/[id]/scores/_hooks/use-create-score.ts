import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { CreateScoreRequest, Score } from '@/app/types/score';

import { createScore } from '../_actions/create-score';

interface CreateScoreParams {
    studentId: number;
    score: CreateScoreRequest;
}

export function useCreateScore() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ studentId, score }: CreateScoreParams) =>
            createScore(studentId, score),
        onMutate: async ({ studentId, score }) => {
            // 이전 데이터 백업
            await queryClient.cancelQueries({ queryKey: ['student-scores', studentId] });
            const previousScores = queryClient.getQueryData(['student-scores', studentId]);

            // 낙관적 업데이트
            queryClient.setQueryData(['student-scores', studentId], (old: any) => {
                if (!old?.scores) return old;

                const newScore: Score = {
                    id: Date.now(), // 임시 ID
                    student_id: studentId,
                    grade: score.grade,
                    semester: score.semester,
                    subject_type: score.subject_type || '일반선택', // null 처리
                    curriculum: score.curriculum,
                    subject: score.subject,
                    raw_score: score.raw_score,
                    subject_average: score.subject_average,
                    standard_deviation: score.standard_deviation || undefined,
                    achievement_level: score.achievement_level || undefined,
                    student_count: score.student_count || undefined,
                    grade_rank: score.grade_rank || undefined,
                    achievement_distribution: score.achievement_distribution || undefined,
                    credit_hours: score.credit_hours || undefined,
                    notes: score.notes || undefined,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };

                return {
                    ...old,
                    scores: [...old.scores, newScore]
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