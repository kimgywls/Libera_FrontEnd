import { useQuery } from "@tanstack/react-query";
import { getOverallEvaluation, OverallEvaluationResponse } from "../_actions/get-overall-evaluation";

export const useOverallEvaluation = (studentId: number) => {
    return useQuery<OverallEvaluationResponse>({
        queryKey: ["overall-evaluation", studentId],
        queryFn: () => getOverallEvaluation(studentId),
        enabled: !!studentId,
    });
}; 