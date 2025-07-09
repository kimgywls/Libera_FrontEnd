import { FC, useState } from 'react';
import {
    School,
    Target,
    BookOpen,
    TrendingUp,
    MapPin,
    GraduationCap,
    Calendar
} from "lucide-react";

interface StudentInfoProps {
    student: {
        name: string;
        current_school_name: string;
        desired_school: string;
        desired_department: string;
        consultation_date: Date;
        overall_score: number;
        main_subjects_score: number;
    };
    onUpdateConsultationDate: (date: Date) => void;
    isConsultationLoading?: boolean;
}

const StudentInfo: FC<StudentInfoProps> = ({ student, onUpdateConsultationDate, isConsultationLoading }) => {
    const [inputDate, setInputDate] = useState<string>(student.consultation_date ? student.consultation_date.toISOString().slice(0, 10) : '');
    const [editMode, setEditMode] = useState(false);
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputDate(e.target.value);
    };

    const handleSave = () => {
        if (inputDate) {
            onUpdateConsultationDate(new Date(inputDate));
            setEditMode(false);
        }
    };

    console.log(student);
    return (
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden px-6 pt-6 pb-4 ">
            <div className="flex flex-row space-x-2 w-full justify-between">
                <div className="flex flex-col space-y-2 w-full">
                    <h1 className="text-2xl font-bold mb-1 text-gray-900" > {student.name} </h1>
                    <div className="text-gray-500 mb-4" > 학생 정보 </div>
                </div>
                <div className="flex flex-row items-center justify-end space-x-4 w-full h-12">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center whitespace-nowrap">
                        <Calendar className="w-5 h-5 text-green-500 mr-2" />
                        상담 일정
                    </h3>
                    {editMode ? (
                        <>
                            <input
                                type="date"
                                className="border rounded px-2 py-1 text-gray-700"
                                value={inputDate}
                                onChange={handleInputChange}
                            />
                            <button
                                className="px-2 py-2 text-gray-500 font-bold rounded-md hover:bg-green-100 whitespace-nowrap"
                                onClick={handleSave}
                                disabled={isConsultationLoading}
                            >
                                {isConsultationLoading ? '저장 중...' : '저장'}
                            </button>
                        </>
                    ) : (
                        <>
                            <p className="text-lg font-semibold text-gray-900">
                                {formatDate(student.consultation_date)}
                            </p>
                            <button
                                className="px-3 py-2 text-gray-500 font-bold rounded-md hover:bg-green-100 whitespace-nowrap"
                                onClick={() => setEditMode(true)}
                            >
                                수정
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6" >
                {/* 현재 상태 */}
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


                {/* 목표 설정 */}
                <div className="space-y-2 flex flex-col h-full">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Target className="w-5 h-5 text-red-500 mr-2" />
                        진학 목표
                    </h3>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex-1">
                        <div className="flex items-start space-x-3">
                            <GraduationCap className="w-5 h-5 text-red-500 mt-0.5" />
                            <div className="flex-1">
                                <p className="font-semibold text-gray-700">목표 대학</p>
                                {student?.desired_school
                                    ? <span className="text-gray-900">{student?.desired_school}</span>
                                    : <span>-</span>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex-1">
                        <div className="flex items-start space-x-3">
                            <BookOpen className="w-5 h-5 text-red-500 mt-0.5" />
                            <div className="flex-1">
                                <p className="font-semibold text-gray-700">희망 전공</p>
                                {student?.desired_department
                                    ? <span className="text-gray-900">{student?.desired_department}</span>
                                    : <span>-</span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default StudentInfo;

