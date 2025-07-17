import { FC, useState } from 'react';
import {
    GraduationCap,
    Check,
    Plus,
} from "lucide-react";
import { StudentInfo as StudentInfoType } from "@/app/types/student";
import { DesiredSchool } from "@/app/types/university";
import { useAddDesiredSchool, useDeleteDesiredSchool } from "../../_hooks/use-desired-school"
import { useInvalidateDesiredSchools } from '../../_hooks/use-invalidate-desired-schools';
import { formatDate, getNextPriority } from './utils';
import ConsultationDateEditor from './ConsultationDateEditor';
import StudentStatus from './StudentStatus';
import DesiredSchoolList from './DesiredSchoolList';
import DesiredSchoolForm from './DesiredSchoolForm';

interface StudentInfoProps {
    student: StudentInfoType;
    desiredSchools: DesiredSchool[];
    isLoadingDesiredSchools: boolean;
}

const StudentInfo: FC<StudentInfoProps> = ({ student, desiredSchools, isLoadingDesiredSchools }) => {
    // 상담일
    const [inputDate, setInputDate] = useState<string>(
        student.consultation_date ? student.consultation_date.toISOString().slice(0, 10) : ''
    );
    const [editMode, setEditMode] = useState(false);

    // 목표 추가 폼
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [newSchoolValue, setNewSchoolValue] = useState('');
    const [newDepartmentValue, setNewDepartmentValue] = useState('');

    const studentId = student.id;
    const { mutate: addDesiredSchool } = useAddDesiredSchool();
    const { mutate: deleteDesiredSchool } = useDeleteDesiredSchool();
    const invalidateDesiredSchools = useInvalidateDesiredSchools(studentId);

    // 목표 추가
    const handleSaveNew = () => {
        const nextPriority = getNextPriority(desiredSchools);
        addDesiredSchool({
            school_name: newSchoolValue.trim() || "none",
            department_name: newDepartmentValue.trim() || "none",
            priority: nextPriority,
            student_id: studentId,
        }, {
            onSuccess: () => {
                invalidateDesiredSchools();
                setIsAddOpen(false);
                setNewSchoolValue('');
                setNewDepartmentValue('');
            }
        });
    };
    const handleCancelNew = () => {
        setIsAddOpen(false);
        setNewSchoolValue('');
        setNewDepartmentValue('');
    };
    // 목표 삭제
    const handleDeleteDepartment = (id: number) => {
        deleteDesiredSchool(id, {
            onSuccess: () => {
                invalidateDesiredSchools();
            }
        });
    };

    return (
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden px-6 pt-6 pb-4">
            <div className="flex flex-row space-x-2 w-full justify-between">
                <div className="flex flex-col space-y-2 w-full">
                    <h1 className="text-2xl font-bold mb-1 text-gray-900">{student.name}</h1>
                    <div className="text-gray-500 mb-4">학생 정보</div>
                </div>
                <div className="flex flex-row items-center justify-end space-x-4 w-full h-12">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center whitespace-nowrap">
                        상담 일정
                    </h3>
                    <ConsultationDateEditor
                        editMode={editMode}
                        inputDate={inputDate}
                        setInputDate={setInputDate}
                        onSave={() => setEditMode(false)}
                        onCancel={() => setEditMode(false)}
                        displayDate={formatDate(student.consultation_date)}
                    />
                    <button
                        className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setEditMode(true)}
                        title="수정"
                    >
                        <Check className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
                {/* 현재 상태 */}
                <StudentStatus student={student} />
                {/* 목표 설정 */}
                <div className="space-y-2 flex flex-col h-full">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            진학 목표
                        </h3>
                        <button
                            className={`p-2 ${isAddOpen ? 'bg-gray-100 text-gray-600' : 'text-red-500 hover:bg-red-50'} rounded-lg transition-colors`}
                            onClick={() => setIsAddOpen(prev => !prev)}
                            title={isAddOpen ? '입력 폼 닫기' : '새 목표 추가'}
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex-1">
                        <div className="flex items-start space-x-3">
                            <GraduationCap className="w-5 h-5 text-red-500 mt-0.5" />
                            <div className="flex-1">
                                <p className="font-semibold text-gray-700 mb-3">목표 대학 및 학과</p>
                                <div className="space-y-3">
                                    {/* 새 목표 추가 입력 */}
                                    {isAddOpen && (
                                        <DesiredSchoolForm
                                            newSchoolValue={newSchoolValue}
                                            setNewSchoolValue={setNewSchoolValue}
                                            newDepartmentValue={newDepartmentValue}
                                            setNewDepartmentValue={setNewDepartmentValue}
                                            onSave={handleSaveNew}
                                            onCancel={handleCancelNew}
                                        />
                                    )}
                                    {/* 목표 목록 */}
                                    {isLoadingDesiredSchools ? (
                                        <span className="text-gray-500 italic">목표 목록을 불러오는 중...</span>
                                    ) : (
                                        <DesiredSchoolList
                                            desiredSchools={desiredSchools}
                                            onDelete={handleDeleteDepartment}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudentInfo;