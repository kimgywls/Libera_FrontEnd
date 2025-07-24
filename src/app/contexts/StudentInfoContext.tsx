'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useOverallGpa } from '@/app/dashboard/[id]/scores/_hooks/use-overall-gpa';
import { useDesiredSchools } from '@/app/dashboard/_hooks/use-desired-schools';
import { StudentInfo } from '@/app/types/student';
import { DesiredSchool } from '@/app/types/university';
import { useQuery } from '@tanstack/react-query';
import { fetchStudentDetail } from '@/app/main/_actions/fetch-student-detail';

interface StudentInfoProviderProps {
    studentId: number;
    children: ReactNode;
}

interface StudentInfoContextValue {
    studentInfo: StudentInfo | null;
    desiredSchools: DesiredSchool[];
    isLoading: boolean;
    isError: boolean;
}

const StudentInfoContext = createContext<StudentInfoContextValue | null>(null);

export const StudentInfoProvider = ({ studentId, children }: StudentInfoProviderProps) => {
    // 학생 정보 가져오기
    const { data: student, isLoading: studentLoading, isError: studentError } = useQuery({
        queryKey: ['student-detail', studentId],
        queryFn: () => fetchStudentDetail(studentId),
        enabled: !!studentId,
    });

    const { overallGpa, mainSubjectsGpa } = useOverallGpa(studentId);
    const { data: desiredSchools = [], isLoading: schoolsLoading } = useDesiredSchools(studentId);

    const isLoading = studentLoading || schoolsLoading;
    const isError = studentError;

    const studentInfo: StudentInfo | null = student ? {
        id: student.id,
        name: student.name,
        current_school_name: student.current_school_name,
        desired_school: desiredSchools,
        desired_department: desiredSchools,
        consultation_date: new Date() ?? null,
        overall_score: overallGpa ?? 0,
        main_subjects_score: mainSubjectsGpa ?? 0,
    } : null;

    const value: StudentInfoContextValue = {
        studentInfo,
        desiredSchools: desiredSchools,
        isLoading,
        isError,
    };

    return (
        <StudentInfoContext.Provider value={value}>
            {children}
        </StudentInfoContext.Provider>
    );
};

export const useStudentInfoContext = () => {
    const context = useContext(StudentInfoContext);
    if (!context) throw new Error('useStudentInfo는 StudentInfoProvider 내부에서만 사용해야 합니다.');
    return context;
}; 