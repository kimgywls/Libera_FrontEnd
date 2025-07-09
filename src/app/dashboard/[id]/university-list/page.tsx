"use client";

import { useStudentContext } from '@/app/dashboard/_contexts/StudentContext';
import StudentInfoSection from '@/app/dashboard/_components/StudentInfoSection';
import RecommanedUniversityListSection from '@/app/dashboard/_components/RecommanedUniversityListSection';
import { useSchoolRecommendations } from './_hooks/useSchoolRecommendations';
import { useState, useCallback } from 'react';

export default function UniversityListPage() {
    const { student } = useStudentContext();
    const [consultationDate, setConsultationDate] = useState<Date>(new Date());
    const [isConsultationLoading, setIsConsultationLoading] = useState(false);

    const onUpdateConsultationDate = useCallback((date: Date) => {
        setIsConsultationLoading(true);
        setTimeout(() => {
            setConsultationDate(date);
            setIsConsultationLoading(false);
        }, 500); // TODO: 실제 저장 로직으로 교체
    }, []);

    const { data, loading, error } = useSchoolRecommendations(student?.id);

    return (
        <div className="flex flex-col gap-8">
            {student && (
                <StudentInfoSection
                    student={{
                        name: student.name,
                        current_school_name: student.current_school_name,
                        desired_school: student.desired_school,
                        desired_department: student.desired_department,
                        consultation_date: consultationDate,
                        overall_score: 0, // TODO: 실제 점수로 교체
                    }}
                    consultationDate={consultationDate}
                    onUpdateConsultationDate={onUpdateConsultationDate}
                    isConsultationLoading={isConsultationLoading}
                />
            )}
            <RecommanedUniversityListSection data={data} loading={loading} error={error} />
        </div>
    );
}