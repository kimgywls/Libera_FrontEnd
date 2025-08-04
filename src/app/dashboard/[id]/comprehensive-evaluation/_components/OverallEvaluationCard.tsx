import { FC } from "react";
import EditToggleButton from "./EditToggleButton";
import EditableEvaluationText from "./EditableEvaluationText";

interface OverallEvaluationCardProps {
    overallEvaluation?: string;
    isEditing: boolean;
    isUpdating: boolean;
    editContent: string;
    onEditToggle: () => void;
    onContentChange: (content: string) => void;
}

const OverallEvaluationCard: FC<OverallEvaluationCardProps> = ({
    overallEvaluation,
    isEditing,
    isUpdating,
    editContent,
    onEditToggle,
    onContentChange
}) => {
    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    전체 종합 의견
                </h4>
                <EditToggleButton
                    isEditing={isEditing}
                    isUpdating={isUpdating}
                    hasContent={!!overallEvaluation}
                    onToggle={onEditToggle}
                    editText="수정"
                    completeText="완료"
                    updateText="저장 중..."
                    createText="작성하기"
                />
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                        <EditableEvaluationText
                            isEditing={isEditing}
                            content={isEditing ? editContent : (overallEvaluation || '')}
                            placeholder="전체 종합 의견을 입력하세요..."
                            onContentChange={onContentChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverallEvaluationCard; 