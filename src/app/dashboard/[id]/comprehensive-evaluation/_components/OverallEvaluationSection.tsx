import { FC, useState } from "react";

import Section from "@/app/dashboard/_components/Section";
import DataState from "@/app/dashboard/_components/DataState";
import { FinalEvaluationResponse } from "@/app/types/comprehensiveEvaluation";
import OverallEvaluationCard from "./OverallEvaluationCard";

interface OverallEvaluationSectionProps {
    isLoading?: boolean;
    isError?: boolean;
    overallEvaluation?: FinalEvaluationResponse['overall_evaluation'];
    onOverallEvaluationUpdate?: (newContent: string) => void;
    isOverallUpdating?: boolean;
}

const OverallEvaluationSection: FC<OverallEvaluationSectionProps> = ({
    isLoading = false,
    isError = false,
    overallEvaluation,
    onOverallEvaluationUpdate,
    isOverallUpdating = false
}) => {
    const [editingOverall, setEditingOverall] = useState(false);
    const [editOverallContent, setEditOverallContent] = useState<string>('');

    const handleOverallEditToggle = () => {
        if (editingOverall) {
            // 완료 버튼 클릭 시 수정 내용 저장
            const newContent = editOverallContent || overallEvaluation || '';

            if (onOverallEvaluationUpdate) {
                onOverallEvaluationUpdate(newContent);
            }

            setEditingOverall(false);
            setEditOverallContent('');
        } else {
            // 수정 모드 진입
            setEditingOverall(true);
            setEditOverallContent(overallEvaluation || '');
        }
    };

    const handleContentChange = (content: string) => {
        setEditOverallContent(content);
    };

    return (
        <div className="space-y-6">
            {/* 최종평가 섹션 */}
            <Section title="최종 결과 및 의견">
                <DataState
                    isLoading={isLoading}
                    isError={isError}
                    isEmpty={!overallEvaluation}
                    loadingMessage="전체 종합 의견을 불러오는 중입니다..."
                    errorMessage="전체 종합 의견을 불러오는데 실패했습니다."
                    emptyMessage="저장된 최종 종합 의견이 없습니다."
                >
                    <div className="ml-2">
                        <OverallEvaluationCard
                            overallEvaluation={overallEvaluation || undefined}
                            isEditing={editingOverall}
                            isUpdating={isOverallUpdating}
                            editContent={editOverallContent}
                            onEditToggle={handleOverallEditToggle}
                            onContentChange={handleContentChange}
                        />
                    </div>
                </DataState>
            </Section>
        </div>
    );
};

export default OverallEvaluationSection;