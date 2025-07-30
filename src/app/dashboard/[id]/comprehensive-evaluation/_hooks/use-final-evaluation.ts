import { useQuery } from "@tanstack/react-query";
import { getFinalEvaluation, FinalEvaluationResponse } from "../_actions/get-final-evaluation";

export const useFinalEvaluation = (studentId: number) => {
    return useQuery<FinalEvaluationResponse>({
        queryKey: ["final-evaluation", studentId],
        queryFn: () => getFinalEvaluation(studentId),
        enabled: !!studentId,
    });
}; 