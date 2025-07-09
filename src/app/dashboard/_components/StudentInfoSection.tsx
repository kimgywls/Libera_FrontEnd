import type { FC } from 'react';
import StudentInfo from './StudentInfo';
import { StudentInfo as StudentInfoType } from '@/app/types/student';

interface StudentInfoSectionProps {
    student: StudentInfoType;
    consultationDate: Date;
    onUpdateConsultationDate: (date: Date) => void;
    isConsultationLoading: boolean;
}

const StudentInfoSection: FC<StudentInfoSectionProps> = ({ student, consultationDate, onUpdateConsultationDate, isConsultationLoading }) => {
    if (!student) return null;
    return (
        <StudentInfo
            student={{
                name: student.name,
                current_school_name: student.current_school_name,
                desired_school: student.desired_school,
                desired_department: student.desired_department,
                consultation_date: consultationDate,
                overall_score: student.overall_score ?? 0,
                main_subjects_score: student.main_subjects_score ?? 0,
            }}
            onUpdateConsultationDate={onUpdateConsultationDate}
            isConsultationLoading={isConsultationLoading}
        />
    );
};

export default StudentInfoSection; 