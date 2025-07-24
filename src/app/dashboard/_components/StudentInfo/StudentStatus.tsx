import { FC } from 'react';
import { StudentInfo as StudentInfoType } from '@/app/types/student';
import { MapPin, School, TrendingUp } from 'lucide-react';

const StudentStatus: FC<{ student: StudentInfoType }> = ({ student }) => (
    <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <School className="w-5 h-5 text-blue-500 mr-2" />
            현재 상태
        </h3>
        <div className="bg-gray-50 rounded-lg p-4 flex-1">
            <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                    <p className="font-semibold text-gray-700">재학 중인 학교</p>
                    <p className="text-gray-900 mt-1">
                        {student?.current_school_name}
                    </p>
                </div>
            </div>
        </div>

        <div className="flex flex-row space-x-2">
            <div className="bg-gray-50 rounded-lg p-4 flex-1">
                <div className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                        <p className="font-semibold text-gray-700">전학기 전체교과 내신 성적</p>
                        <p className="text-gray-900 mt-1">
                            {student?.overall_score} 등급
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex-1">
                <div className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                        <p className="font-semibold text-gray-700">전학기 주요과목 내신 성적</p>
                        <p className="text-gray-900 mt-1">
                            {student?.main_subjects_score} 등급
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

);

export default StudentStatus; 