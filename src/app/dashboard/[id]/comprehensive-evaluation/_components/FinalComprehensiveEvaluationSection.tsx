import { FC } from "react";
import Section from "@/app/dashboard/_components/Section";
import DataState from "@/app/dashboard/_components/DataState";

interface FinalComprehensiveEvaluationSectionProps {
    isLoading?: boolean;
    isError?: boolean;
    data?: {
        comprehensive_analysis?: string;
        final_opinion?: string;
    };
}

const FinalComprehensiveEvaluationSection: FC<FinalComprehensiveEvaluationSectionProps> = ({
    isLoading = false,
    isError = false,
    data
}) => {
    const isEmpty = !data?.comprehensive_analysis && !data?.final_opinion;

    return (
        <div className="space-y-6">
            {/* 학생부 종합 분석 및 의견 섹션 */}
            <Section
                title="학생부 종합 분석 및 의견"
            >
                <DataState
                    isLoading={isLoading}
                    isError={isError}
                    isEmpty={!data?.comprehensive_analysis}
                    loadingMessage="학생부 종합 분석을 불러오는 중입니다..."
                    errorMessage="학생부 종합 분석을 불러오는데 실패했습니다."
                    emptyMessage="등록된 학생부 종합 분석이 없습니다."
                >
                    <div className="whitespace-pre-wrap p-4 bg-gray-50 rounded-lg text-gray-700">
                        {data?.comprehensive_analysis}
                    </div>
                </DataState>
            </Section>

            {/* 전체 종합 의견 섹션 */}
            <Section
                title="전체 종합 의견"
            >
                <DataState
                    isLoading={isLoading}
                    isError={isError}
                    isEmpty={!data?.final_opinion}
                    loadingMessage="전체 종합 의견을 불러오는 중입니다..."
                    errorMessage="전체 종합 의견을 불러오는데 실패했습니다."
                    emptyMessage="등록된 전체 종합 의견이 없습니다."
                >
                    <div className="whitespace-pre-wrap p-4 bg-gray-50 rounded-lg text-gray-700">
                        {data?.final_opinion}
                    </div>
                </DataState>
            </Section>
        </div>
    );
};

export default FinalComprehensiveEvaluationSection;  