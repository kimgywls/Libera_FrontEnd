import { FC } from "react";
import { ChevronRight } from "lucide-react";

interface ResultReportOverallEvaluationCardProps {
    overallEvaluation?: string;
}

const ResultReportOverallEvaluationCard: FC<ResultReportOverallEvaluationCardProps> = ({
    overallEvaluation
}) => {
    return (
        <div className="">
            <div className="flex items-center mb-2 space-x-1">
                <ChevronRight strokeWidth={3} className="w-5 h-5" style={{ color: '#8e51ff' }} />
                <h4 className="text-xl font-semibold flex items-center" style={{ color: '#7f22fe' }}>
                    전체 종합 의견
                </h4>
            </div>

            <div className="border rounded-lg p-5" style={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb' }}>
                <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                        <div className="whitespace-pre-line" style={{ color: '#374151' }}>
                            {overallEvaluation || '등록된 의견이 없습니다.'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultReportOverallEvaluationCard; 