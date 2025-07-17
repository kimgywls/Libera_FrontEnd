"use client";

import { useStudentInfoContext } from '@/app/dashboard/_contexts/StudentInfoContext';
import StudentInfoSection from '@/app/dashboard/_components/StudentInfoSection';
import UniversityListSection from './UniversityListSection';
import { useSchoolRecommendations } from '../_hooks/use-school-recommendations';

export default function UniversityListWidget() {
    const { studentInfo } = useStudentInfoContext();
    const { data, isLoading, error } = useSchoolRecommendations(studentInfo!.id);

    return (
        <div className="space-y-10 ">
            <StudentInfoSection student={studentInfo!} />
            <UniversityListSection data={data ?? null} loading={isLoading} error={error} />
        </div>
    );
}