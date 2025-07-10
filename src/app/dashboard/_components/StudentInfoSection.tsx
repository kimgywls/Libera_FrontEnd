import type { FC } from 'react';
import StudentInfo from './StudentInfo';
import { StudentInfo as StudentInfoType } from '@/app/types/student';

interface StudentInfoSectionProps {
    student: StudentInfoType;
}

const StudentInfoSection: FC<StudentInfoSectionProps> = ({ student }) => {

    if (!student) return null;
    return (
        <StudentInfo
            student={student}
        />
    );
};

export default StudentInfoSection; 