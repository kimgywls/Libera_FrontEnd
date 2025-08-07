import { FC } from 'react';
import {
    GraduationCap,
    Target,
} from "lucide-react";
import { StudentInfo as StudentInfoType } from "@/app/types/student";
import { formatDate } from '@/app/dashboard/_components/StudentInfo/utils';
import ResultReportStudentStatus from './ResultReportStudentStatus';
import DesiredSchoolList from '@/app/dashboard/_components/StudentInfo/DesiredSchoolList';
import ResultReportSection from '../ResultReportSection';

interface StudentInfoProps {
    student: StudentInfoType;
}

const ResultReportStudentInfo: FC<StudentInfoProps> = ({ student }) => {
    return (
        <ResultReportSection title="학생 정보">
            <div className="px-4 py-3 border border-gray-200 rounded-lg" style={{ borderColor: '#e5e7eb', backgroundColor: '#f5f3ff' }}>
                <div className="flex flex-row space-x-2 w-full justify-between">
                    <div className="flex flex-col space-y-2 w-full">
                        <h1 className="text-2xl font-bold mb-1" style={{ color: '#111827' }}>{student.name}</h1>
                    </div>
                    <div className="flex flex-row items-center justify-end space-x-4 w-full h-12 mr-2">
                        <h3 className="text-lg font-semibold flex items-center whitespace-nowrap" style={{ color: '#111827' }}>
                            상담 일정
                        </h3>
                        <div className="font-medium" style={{ color: '#374151' }}>{formatDate(student.consultation_date)}</div>

                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    {/* 현재 상태 */}
                    <ResultReportStudentStatus student={student} />
                    {/* 목표 설정 */}
                    <div className="space-y-2 flex flex-col h-full">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold flex items-center" style={{ color: '#111827' }}>
                                <Target className="w-5 h-5 mr-2" style={{ color: '#ef4444' }} />
                                진학 목표
                            </h3>
                        </div>
                        <div className="rounded-lg p-4 border flex-1" style={{ backgroundColor: '#ffffff', borderColor: '#f3f4f6' }}>
                            <div className="flex items-start space-x-3">
                                <GraduationCap className="w-5 h-5 mt-0.5" style={{ color: '#ef4444' }} />
                                <div className="flex-1">
                                    <p className="font-semibold mb-3" style={{ color: '#374151' }}>목표 대학 및 학과</p>
                                    <div className="space-y-3">

                                        <DesiredSchoolList
                                            desiredSchools={student.desired_school}
                                            onDelete={() => { }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ResultReportSection >
    );
};

export default ResultReportStudentInfo;