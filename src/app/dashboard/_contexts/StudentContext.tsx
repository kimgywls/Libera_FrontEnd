'use client';

import { createContext, useContext, ReactNode } from 'react';
import { Student } from '@/app/types/student';
import { useStudentByPhone } from '@/app/main/_hooks/use-students-list';

interface StudentContextValue {
    student: Student | null;
    isLoading: boolean;
    isError: boolean;
}

interface StudentProviderProps {
    studentId: number;
    children: ReactNode;
}

const StudentContext = createContext<StudentContextValue | undefined>(undefined);

export const StudentProvider = ({ studentId, children }: StudentProviderProps) => {
    const { student, isLoading, isError } = useStudentByPhone(studentId);
    //console.log("student", student);
    const value: StudentContextValue = {
        student: student ?? null,
        isLoading,
        isError: isError,
    };

    return (
        <StudentContext.Provider value={value}>
            {children}
        </StudentContext.Provider>
    );
};

export const useStudentContext = () => {
    const context = useContext(StudentContext);
    if (!context) {
        throw new Error('useStudentContext는 StudentProvider 내부에서만 사용해야 합니다.');
    }
    return context;
}; 