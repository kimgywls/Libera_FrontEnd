import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ChecklistSubmitResponse } from '@/app/types/checklist';

import { postChecklistResponses } from '../_actions/post-checklist-responses';

export function useChecklistSubmit() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postChecklistResponses,
        onSuccess: (data: ChecklistSubmitResponse, variables) => {
            // checklist-responses 쿼리 캐시 갱신
            if (variables?.student_id) {
                queryClient.setQueryData<ChecklistSubmitResponse>(['checklist-responses', variables.student_id], (prev) => ({
                    ...(prev || {}),
                    student_id: variables.student_id,
                    responses: data.responses,
                    result_scores: data.result_scores,
                }));
                // checklist-result 쿼리 캐시 갱신
                queryClient.setQueryData<Partial<ChecklistSubmitResponse>>(['checklist-result', variables.student_id], (prev) => ({
                    ...(prev || {}),
                    student_id: variables.student_id,
                    result_scores: data.result_scores,
                }));

                // 체크리스트 점수 변경 시 종합평가 문구 자동 갱신을 위해 final-evaluation 쿼리 무효화
                queryClient.invalidateQueries({ queryKey: ['final-evaluation', variables.student_id] });

                // 체크리스트 점수 변경 시 추천 학교 분석 점수 자동 갱신을 위해 saved-recommendations 쿼리 무효화
                queryClient.invalidateQueries({ queryKey: ['saved-recommendations', variables.student_id] });
            }
        },
        onError: (error: Error) => {
            console.error('Error submitting checklist:', error);
        },
    });
}
