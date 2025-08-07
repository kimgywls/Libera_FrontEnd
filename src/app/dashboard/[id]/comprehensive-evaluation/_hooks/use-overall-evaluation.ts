import { useQuery } from "@tanstack/react-query";
import { getOverallEvaluation } from "../_actions/get-overall-evaluation";
import { OverallEvaluationResponse } from "@/app/types/comprehensiveEvaluation";

export const useOverallEvaluation = (studentId: number) => {
    return useQuery<OverallEvaluationResponse>({
        queryKey: ["overall-evaluation", studentId],
        queryFn: () => getOverallEvaluation(studentId),
        enabled: !!studentId,
    });
}; 