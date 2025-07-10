"use client";

import { useStudentInfoContext } from '@/app/dashboard/_contexts/StudentInfoContext';
import StudentInfoSection from '@/app/dashboard/_components/StudentInfoSection';
import RecommendedUniversityListSection from './_components/RecommendedUniversityListSection';
import { useSchoolRecommendations } from './_hooks/useSchoolRecommendations';

export default function UniversityListPage() {
    const { studentInfo } = useStudentInfoContext();

    const { data, loading, error } = useSchoolRecommendations(studentInfo!.id);

    return (
        <div className="flex flex-col gap-8">
            {studentInfo && (
                <StudentInfoSection
                    student={studentInfo}
                />
            )}
            <RecommendedUniversityListSection data={data} loading={loading} error={error} />
        </div>
    );
}