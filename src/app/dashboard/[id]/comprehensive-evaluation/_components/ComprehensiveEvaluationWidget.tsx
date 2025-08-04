'use client';

import React, { FC } from 'react';

import { useStudentInfoContext } from '@/app/contexts/StudentInfoContext';
import StudentInfoSection from '@/app/dashboard/_components/StudentInfoSection';
import { useFinalEvaluation } from '../_hooks/use-final-evaluation';
import { useUpdateCategoryEvaluation } from '../_hooks/use-update-category-evaluation';
import { useUpdateOverallEvaluation } from '../_hooks/use-update-overall-evaluation';
import { useSavedRecommendations } from '../_hooks/use-saved-recommendations';
import FinalRecommendedSchoolsSection from './FinalRecommendedSchoolsSection';
import CategoryEvaluationSection from './CategoryEvaluationSection';
import OverallEvaluationSection from './OverallEvaluationSection';

const ComprehensiveEvaluationWidget: FC = () => {
    const { studentInfo } = useStudentInfoContext();
    const studentId = studentInfo?.id || 0;
    const { data: finalEvaluationData, isLoading, isError, isFetching } = useFinalEvaluation(studentId);
    const updateCategoryMutation = useUpdateCategoryEvaluation();
    const updateOverallMutation = useUpdateOverallEvaluation();

    // 추천 학교 데이터 가져오기
    const { data: savedRecommendations, isLoading: isRecommendationsLoading, error: recommendationsError } = useSavedRecommendations({
        student_id: studentId,
        rec_status: 'active'
    });

    const handleCategoryEvaluationUpdate = (categoryId: number, newContent: string) => {
        if (!studentInfo) return;

        // API 호출
        updateCategoryMutation.mutate({
            studentId: studentId,
            mainCategoryId: categoryId,
            evaluationContent: newContent,
            isFinal: true
        });
    };

    const handleOverallEvaluationUpdate = (newContent: string) => {
        if (!studentInfo) return;

        updateOverallMutation.mutate({
            studentId: studentId,
            overallEvaluation: newContent
        });
    };

    // studentId가 없으면 로딩 상태 표시
    if (!studentInfo) {
        return (
            <div className="flex items-center justify-center py-16">
                <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="text-gray-600 font-medium">학생 정보를 불러오는 중...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            <StudentInfoSection student={studentInfo} />

            <div id="final-recommended-schools-section">
                <FinalRecommendedSchoolsSection
                    savedRecommendations={savedRecommendations}
                    isLoading={isRecommendationsLoading}
                    error={recommendationsError}
                />
            </div>

            <div id="category-evaluation-section">
                <CategoryEvaluationSection
                    isLoading={isLoading}
                    isError={isError}
                    categoryEvaluations={finalEvaluationData?.category_evaluations}
                    onCategoryEvaluationUpdate={handleCategoryEvaluationUpdate}
                    isCategoryEvaluationUpdating={updateCategoryMutation.isPending || isFetching}
                />
            </div>

            <div id="overall-evaluation-section">
                <OverallEvaluationSection
                    isLoading={isLoading}
                    isError={isError}
                    overallEvaluation={finalEvaluationData?.overall_evaluation}
                    onOverallEvaluationUpdate={handleOverallEvaluationUpdate}
                    isOverallUpdating={updateOverallMutation.isPending || isFetching}
                />
            </div>
        </div>
    );
};

export default ComprehensiveEvaluationWidget;