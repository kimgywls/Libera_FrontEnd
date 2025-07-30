import type { FC } from 'react';
import StudentInfo from './StudentInfo/StudentInfo';
import { StudentInfo as StudentInfoType } from '@/app/types/student';
import { useStudentInfoContext } from '@/app/contexts/StudentInfoContext';

interface StudentInfoSectionProps {
    student: StudentInfoType;
}

const StudentInfoSection: FC<StudentInfoSectionProps> = ({ student }) => {
    const { desiredSchools, isLoadingDesiredSchools } = useStudentInfoContext();

    if (!student) return null;

    return (
        <StudentInfo
            student={student}
            desiredSchools={desiredSchools}
            isLoadingDesiredSchools={isLoadingDesiredSchools}
        />
    );
};

export default StudentInfoSection; 