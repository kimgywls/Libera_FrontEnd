"use client";

import { useStudentInfoContext } from '@/app/dashboard/_contexts/StudentInfoContext';
import StudentInfoSection from '@/app/dashboard/_components/StudentInfoSection';
import UniversityListSection from './_components/UniversityListSection';
import { useSchoolRecommendations } from './_hooks/useSchoolRecommendations';

export default function UniversityListPage() {
    const { studentInfo } = useStudentInfoContext();
    const { data, loading, error } = useSchoolRecommendations(studentInfo!.id);

    return (
        <div className="space-y-10 ">
            <StudentInfoSection student={studentInfo!} />
            <UniversityListSection data={data} loading={loading} error={error} />
        </div>
    );
}