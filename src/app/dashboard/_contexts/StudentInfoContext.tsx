'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useOverallGpa } from '@/app/dashboard/[id]/scores/_hooks/use-overall-gpa';
import { useDesiredSchools } from '@/app/dashboard/[id]/university-list/_hooks/use-desired-schools';
import { Student, StudentInfo } from '@/app/types/student';
import { DesiredSchool } from '@/app/types/university';

interface StudentInfoProviderProps {
    student: Student;
    children: ReactNode;
}

interface StudentInfoContextValue {
    studentInfo: StudentInfo;
    desiredSchools: DesiredSchool[];
}

const StudentInfoContext = createContext<StudentInfoContextValue | null>(null);

export const StudentInfoProvider = ({ student, children }: StudentInfoProviderProps) => {
    if (!student) throw new Error('StudentInfoProvider에는 student가 반드시 필요합니다.');
    const { overallGpa, mainSubjectsGpa } = useOverallGpa(student.id);
    const { data: desiredSchools = [] } = useDesiredSchools(student.id);

    const studentInfo: StudentInfo = {
        id: student.id,
        name: student.name,
        current_school_name: student.current_school_name,
        desired_school: desiredSchools,
        desired_department: desiredSchools,
        consultation_date: new Date() ?? null,
        overall_score: overallGpa ?? 0,
        main_subjects_score: mainSubjectsGpa ?? 0,
    };

    const value: StudentInfoContextValue = {
        studentInfo,
        desiredSchools: desiredSchools,
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



