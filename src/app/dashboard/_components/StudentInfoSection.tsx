import type { FC } from 'react';
import StudentInfo from './StudentInfo/StudentInfo';
import { StudentInfo as StudentInfoType } from '@/app/types/student';
import { useDesiredSchools } from '@/app/dashboard/_hooks/use-desired-schools';

interface StudentInfoSectionProps {
    student: StudentInfoType;
}

const StudentInfoSection: FC<StudentInfoSectionProps> = ({ student }) => {
    const studentId = student!.id;
    const { data: desiredSchools = [], isLoading } = useDesiredSchools(studentId);

    if (!student) return null;

    return (
        <StudentInfo
            student={student}
            desiredSchools={desiredSchools}
            isLoadingDesiredSchools={isLoading}
        />
    );
};

export default StudentInfoSection; 