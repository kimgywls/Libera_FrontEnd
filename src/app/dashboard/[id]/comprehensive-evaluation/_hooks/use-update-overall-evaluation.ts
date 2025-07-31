import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOverallEvaluation } from "../_actions/update-overall-evaluation";
import { FinalEvaluationResponse, UpdateOverallEvaluationParams } from "@/app/types/comprehensiveEvaluation";

export const useUpdateOverallEvaluation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: UpdateOverallEvaluationParams) => updateOverallEvaluation({
            studentId: params.studentId,
            overallEvaluation: params.overallEvaluation
        }),
        onMutate: async (variables) => {
            // 낙관적 업데이트를 위해 이전 데이터를 백업
            const previousData = queryClient.getQueryData<FinalEvaluationResponse>([
                "final-evaluation", 
                variables.studentId
            ]);

            // 즉시 데이터 업데이트
            queryClient.setQueryData<FinalEvaluationResponse>(
                ["final-evaluation", variables.studentId],
                (oldData) => {
                    if (!oldData) return oldData;
                    
                    return {
                        ...oldData,
                        overall_evaluation: variables.overallEvaluation
                    };
                }
            );

            // 이전 데이터를 반환하여 롤백에 사용
            return { previousData };
        },
        onSuccess: (data, variables) => {
            // 성공 시에도 데이터를 다시 설정하여 확실히 반영
            queryClient.setQueryData<FinalEvaluationResponse>(
                ["final-evaluation", variables.studentId],
                (oldData) => {
                    if (!oldData) return oldData;
                    
                    return {
                        ...oldData,
                        overall_evaluation: variables.overallEvaluation
                    };
                }
            );
        },
        onError: (error, variables, context) => {
            console.error("Failed to update overall evaluation:", error);
            
            // 에러 발생 시 이전 데이터로 롤백
            if (context?.previousData) {
                queryClient.setQueryData(
                    ["final-evaluation", variables.studentId],
                    context.previousData
                );
            }
        }
    });
}; 