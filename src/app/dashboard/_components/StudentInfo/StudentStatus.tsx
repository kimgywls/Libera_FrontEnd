import { FC } from 'react';
import { StudentInfo as StudentInfoType } from '@/app/types/student';

const StudentStatus: FC<{ student: StudentInfoType }> = ({ student }) => (
    <div className="flex flex-col space-y-2">
        <div className="bg-gray-50 rounded-lg p-4 flex-1">
            <div className="flex items-start space-x-3">
                <span className="font-semibold text-gray-700">재학 중인 학교</span>
                <span className="text-gray-900 mt-1">{student.current_school_name}</span>
            </div>
        </div>
        <div className="flex flex-row space-x-2">
            <div className="bg-gray-50 rounded-lg p-4 flex-1">
                <span className="font-semibold text-gray-700">전학기 전체교과 내신 성적</span>
                <span className="text-gray-900 mt-1">{student.overall_score} 등급</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex-1">
                <span className="font-semibold text-gray-700">전학기 주요과목 내신 성적</span>
                <span className="text-gray-900 mt-1">{student.main_subjects_score} 등급</span>
            </div>
        </div>
    </div>
);

export default StudentStatus; 