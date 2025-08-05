import { FC, useState, useCallback, useEffect, useRef } from "react";

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
    const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // 디바운스 자동 저장 기능
    useEffect(() => {
        if (editingOverall && editOverallContent !== (overallEvaluation ?? '')) {
            // 이전 타이머가 있다면 클리어
            if (autoSaveTimeoutRef.current) {
                clearTimeout(autoSaveTimeoutRef.current);
            }

            // 5초 후 자동 저장
            autoSaveTimeoutRef.current = setTimeout(() => {
                if (onOverallEvaluationUpdate) {
                    onOverallEvaluationUpdate(editOverallContent);
                }
            }, 5000);
        }

        // 컴포넌트 언마운트 시 타이머 클리어
        return () => {
            if (autoSaveTimeoutRef.current) {
                clearTimeout(autoSaveTimeoutRef.current);
            }
        };
    }, [editingOverall, editOverallContent, overallEvaluation, onOverallEvaluationUpdate]);

    const handleOverallEditToggle = useCallback(() => {
        if (editingOverall) {
            // 완료 버튼 클릭 시에만 수정 내용 저장
            const newContent = editOverallContent ?? overallEvaluation ?? '';

            // 자동 저장 타이머 클리어
            if (autoSaveTimeoutRef.current) {
                clearTimeout(autoSaveTimeoutRef.current);
            }

            if (onOverallEvaluationUpdate) {
                onOverallEvaluationUpdate(newContent);
            }

            setEditingOverall(false);
            // 저장 완료 후 로컬 상태 초기화하지 않음
            // setEditOverallContent('');
        } else {
            // 수정 모드 진입
            setEditingOverall(true);
            setEditOverallContent(overallEvaluation ?? '');
        }
    }, [editingOverall, editOverallContent, overallEvaluation, onOverallEvaluationUpdate]);

    const handleContentChange = useCallback((content: string) => {
        // 로컬 상태만 업데이트 (API 호출 없음)
        setEditOverallContent(content);
    }, []);

    return (
        <div className="space-y-6">
            {/* 최종평가 섹션 */}
            <Section title="최종 결과 및 의견">
                <DataState
                    isLoading={isLoading}
                    isError={isError}
                    isEmpty={false} // 항상 카드를 표시하도록 false로 설정
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