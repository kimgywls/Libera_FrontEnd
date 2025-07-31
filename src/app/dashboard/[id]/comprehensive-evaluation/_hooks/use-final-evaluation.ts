import { useQuery } from "@tanstack/react-query";
import { getFinalEvaluation } from "../_actions/get-final-evaluation";
import { FinalEvaluationResponse } from "@/app/types/comprehensiveEvaluation";

export const useFinalEvaluation = (studentId: number) => {
    return useQuery<FinalEvaluationResponse>({
        queryKey: ["final-evaluation", studentId],
        queryFn: () => getFinalEvaluation(studentId),
        enabled: !!studentId,
    });
}; 