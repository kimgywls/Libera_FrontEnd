import { FC } from "react";
import { useStudentInfoContext } from '@/app/contexts/StudentInfoContext';
import { useSavedRecommendations } from '../_hooks/use-saved-recommendations';
import type { SavedRecommendationItem } from '@/app/types/university';
import BaseTable from '@/app/dashboard/_components/BaseTable';

const FinalRecommendedSchoolsSection: FC = () => {
    const { studentInfo } = useStudentInfoContext();
    const studentId = studentInfo?.id || 0;

    const { data: savedRecommendations, isLoading, error } = useSavedRecommendations({
        student_id: studentId,
        rec_status: 'active'
    });

    // 모든 저장된 추천 학교의 아이템들을 하나의 배열로 합치고 순위별로 정렬
    const allSavedItems: SavedRecommendationItem[] = savedRecommendations?.flatMap(rec => rec.items) || [];
    const sortedItems = allSavedItems.sort((a, b) => a.rank - b.rank);

    const columns = [
        { key: 'rank', label: '순서' },
        { key: 'university_name', label: '대학명' },
        { key: 'admission_type', label: '전형명' },
        { key: 'admission_category', label: '유형구분' },
        { key: 'major_name', label: '학과명' },
        { key: 'suitability_type', label: '교과 판정' },
        { key: 'non_subject_suitability', label: '비교과 판정' },
        { key: 'overall_evaluation', label: '지원적정성' }
    ] as const;

    if (isLoading) {
        return (
            <div className="w-full bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">최종 학교 추천 리스트</h2>
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-3 text-gray-600">저장된 추천 학교를 불러오는 중...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">최종 학교 추천 리스트</h2>
                <div className="text-center py-8 text-red-600">
                    저장된 추천 학교를 불러오는데 실패했습니다.
                </div>
            </div>
        );
    }

    if (!savedRecommendations || savedRecommendations.length === 0) {
        return (
            <div className="w-full bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">최종 학교 추천 리스트</h2>
                <div className="text-center py-8 text-gray-500">
                    저장된 추천 학교가 없습니다.
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">최종 학교 추천 리스트</h2>

            <BaseTable
                columns={columns}
                data={sortedItems}
                className="mt-4"
            />
        </div>
    );
};

export default FinalRecommendedSchoolsSection;  