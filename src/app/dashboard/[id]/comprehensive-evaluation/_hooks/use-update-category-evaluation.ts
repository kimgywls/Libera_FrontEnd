import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategoryEvaluation } from "../_actions/update-category-evaluation";
import { FinalEvaluationResponse } from "../_actions/get-final-evaluation";

interface UpdateCategoryEvaluationParams {
    studentId: number;
    mainCategoryId: number;
    evaluationContent: string;
    isFinal?: boolean;
}

export const useUpdateCategoryEvaluation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: UpdateCategoryEvaluationParams) => updateCategoryEvaluation({
            studentId: params.studentId,
            mainCategoryId: params.mainCategoryId,
            evaluationContent: params.evaluationContent,
            isFinal: params.isFinal
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
                        category_evaluations: oldData.category_evaluations.map(category => 
                            category.main_category_id === variables.mainCategoryId 
                                ? { ...category, final_content: variables.evaluationContent }
                                : category
                        )
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
                        category_evaluations: oldData.category_evaluations.map(category => 
                            category.main_category_id === variables.mainCategoryId 
                                ? { ...category, final_content: variables.evaluationContent }
                                : category
                        )
                    };
                }
            );
        },
        onError: (error, variables, context) => {
            console.error("Failed to update category evaluation:", error);
            
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