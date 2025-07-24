"use client";

import { useStudentInfoContext } from '@/app/contexts/StudentInfoContext';

import StudentInfoSection from '@/app/dashboard/_components/StudentInfoSection';

import { useSchoolRecommendations } from '../_hooks/use-school-recommendations';

import UniversityListSection from './UniversityListSection';

export default function UniversityListWidget() {
    const { studentInfo } = useStudentInfoContext();

    // React Hook 규칙을 준수하기 위해 항상 호출
    const { data, isLoading, error } = useSchoolRecommendations(studentInfo?.id || 0);

    // studentInfo가 없으면 로딩 상태 표시
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
        <div className="space-y-10 ">
            <StudentInfoSection student={studentInfo} />
            <UniversityListSection data={data ?? null} loading={isLoading} error={error} />
        </div>
    );
}