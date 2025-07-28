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
        onSuccess: (_data, variables) => {
            // 정확히 ['student-scores', studentId] 쿼리키를 무효화
            queryClient.invalidateQueries({ queryKey: ['student-scores', variables.studentId] });
        },
    });
} 