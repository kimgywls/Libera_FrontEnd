'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { StudentInfo } from '@/app/types/student';
import type { DesiredSchool } from '@/app/types/university';
import { useDesiredSchools } from '@/app/dashboard/_hooks/use-desired-schools';
import { fetchStudentDetail } from '@/app/main/_actions/fetch-student-detail';
import { useOverallGpa } from '@/app/dashboard/[id]/scores/_hooks/use-overall-gpa';

interface StudentInfoContextType {
    studentInfo: StudentInfo | null;
    desiredSchools: DesiredSchool[];
    isLoadingDesiredSchools: boolean;
    isLoading: boolean;
    isError: boolean;
}

const StudentInfoContext = createContext<StudentInfoContextType>({
    studentInfo: null,
    desiredSchools: [],
    isLoadingDesiredSchools: false,
    isLoading: false,
    isError: false,
});

interface StudentInfoProviderProps {
    studentId: number;
    children: ReactNode;
}

export function StudentInfoProvider({ children, studentId }: StudentInfoProviderProps) {
    // 학생 정보 조회
    const { data: student, isLoading: studentLoading, isError: studentError } = useQuery({
        queryKey: ['student-detail', studentId],
        queryFn: () => fetchStudentDetail(studentId),
        enabled: !!studentId,
    });

    // GPA 정보 조회
    const { overallGpa, mainSubjectsGpa } = useOverallGpa(studentId);

    // 목표 대학 정보 조회
    const { data: desiredSchools = [], isLoading: isLoadingDesiredSchools } = useDesiredSchools(studentId);

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

    return (
        <StudentInfoContext.Provider value={{
            studentInfo,
            desiredSchools,
            isLoadingDesiredSchools,
            isLoading: studentLoading,
            isError: studentError,
        }}>
            {children}
        </StudentInfoContext.Provider>
    );
}

export function useStudentInfoContext() {
    const context = useContext(StudentInfoContext);
    if (context === undefined) {
        throw new Error('useStudentInfoContext must be used within a StudentInfoProvider');
    }
    return context;
} 