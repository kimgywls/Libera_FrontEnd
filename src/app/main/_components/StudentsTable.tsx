import React, { useState, useEffect } from 'react';
import { UserRoundX } from 'lucide-react';

import { Student } from '@/app/types/student';
import { AlertModal } from '@/app/components/modal/AlertModal';
import { useModalState } from '@/app/hooks/useModalState';
import { useDeleteStudent } from '../_hooks/use-delete-student';

import { StudentsTableRow } from './StudentsTableRow';

interface StudentsTableProps {
    students: Student[];
    onSelect?: (ids: number[]) => void;
}

export const StudentsTable: React.FC<StudentsTableProps> = React.memo(({ students, onSelect }) => {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const { deleteStudents } = useDeleteStudent();
    const { openModal, closeModal, isModalOpen } = useModalState();

    useEffect(() => {
        if (onSelect) onSelect(selectedIds);
    }, [selectedIds, onSelect]);

    const handleCheckbox = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
        );
    };

    const handleAllSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(students.map(s => s.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!studentToDelete) return;
        try {
            const result = await deleteStudents([studentToDelete.id]);
            if (!result.success) {
                setErrorMessage(result.message);
                openModal('error');
            }
            closeModal('deleteConfirm');
            setStudentToDelete(null);
        } catch {
            setErrorMessage('삭제 중 오류가 발생했습니다.');
            openModal('error');
            closeModal('deleteConfirm');
            setStudentToDelete(null);
        }
    };

    const handleDeleteRequest = (student: Student) => {
        setStudentToDelete(student);
        openModal('deleteConfirm');
    };

    return (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-100 border-b-2 border-gray-300">
                        <tr>
                            <th className="px-6 py-4 text-left">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.length === students.length && students.length > 0}
                                    onChange={handleAllSelect}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                번호
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                이름
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                휴대폰번호 (부모님)
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                현재 학교
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                희망학교
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                희망학과
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                완료상태
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                삭제
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {students.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-6 py-12 text-center text-gray-500 text-lg">
                                    <div className="flex flex-col items-center space-y-4">
                                        <UserRoundX className="w-10 h-10 text-gray-400" />
                                        학생이 없습니다.
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            students.map((student, index) => (
                                <StudentsTableRow
                                    key={student.id}
                                    student={student}
                                    index={index}
                                    selected={selectedIds.includes(student.id)}
                                    onSelect={handleCheckbox}
                                    onRequestDelete={handleDeleteRequest}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* 삭제 확인 모달 */}
            <AlertModal
                open={isModalOpen('deleteConfirm')}
                title="정말 삭제하시겠습니까?"
                description={studentToDelete ? `이 작업은 되돌릴 수 없습니다\n${studentToDelete.name} 학생의 모든 데이터가 삭제됩니다.` : ''}
                confirmText="삭제"
                cancelText="취소"
                onConfirm={handleDeleteConfirm}
                onCancel={() => {
                    closeModal('deleteConfirm');
                    setStudentToDelete(null);
                }}
            />

            {/* 에러 모달 */}
            <AlertModal
                open={isModalOpen('error')}
                title="오류 발생"
                description={errorMessage}
                confirmText="확인"
                onConfirm={() => {
                    closeModal('error');
                    setErrorMessage('');
                }}
                onCancel={() => {
                    closeModal('error');
                    setErrorMessage('');
                }}
            />
        </div>
    );
});

StudentsTable.displayName = 'StudentsTable';