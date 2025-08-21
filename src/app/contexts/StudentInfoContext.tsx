'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { StudentInfo, StudentDetail } from '@/app/types/student';
import type { DesiredSchool } from '@/app/types/university';
import { useDesiredSchools } from '@/app/dashboard/_hooks/use-desired-schools';
import { fetchStudentDetail } from '@/app/main/_actions/fetch-student-detail';
import { useOverallGpa } from '@/app/dashboard/[id]/scores/_hooks/use-overall-gpa';
import { useUpdateStudentConsultation } from '@/app/dashboard/_hooks/use-update-student-consultation';

interface StudentInfoContextType {
    studentInfo: StudentInfo | null;
    studentDetail: StudentDetail | null;
    desiredSchools: DesiredSchool[];
    isLoadingDesiredSchools: boolean;
    isLoading: boolean;
    isError: boolean;
    updateConsultation: ReturnType<typeof useUpdateStudentConsultation>;
    isUpdatingConsultation: boolean;
}

const StudentInfoContext = createContext<StudentInfoContextType | undefined>(undefined);

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

    // 상담 일정 업데이트 훅
    const updateConsultation = useUpdateStudentConsultation();

    const studentInfo: StudentInfo | null = student ? {
        id: student.id,
        name: student.name,
        birth_date: typeof student.birth_date === 'string' ? new Date(student.birth_date) : student.birth_date,
        phone_number: student.phone_number,
        current_school_name: student.current_school_name,
        desired_school: desiredSchools,
        desired_department: desiredSchools,
        consultation_date: student.consultation_date ? (typeof student.consultation_date === 'string' ? new Date(student.consultation_date) : student.consultation_date) : null,
        overall_score: overallGpa ?? 0,
        main_subjects_score: mainSubjectsGpa ?? 0,
        created_at: student.created_at,
        updated_at: student.updated_at,
        school_histories: student.school_histories || [],
        completion_status: student.completion_status || '미완료',
    } : null;

    return (
        <StudentInfoContext.Provider value={{
            studentInfo,
            studentDetail: student || null,
            desiredSchools,
            isLoadingDesiredSchools,
            isLoading: studentLoading,
            isError: studentError,
            updateConsultation,
            isUpdatingConsultation: updateConsultation.isPending,
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