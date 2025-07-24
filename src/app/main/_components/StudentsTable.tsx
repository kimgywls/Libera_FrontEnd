import React, { useState, useEffect } from 'react';
import { UserRoundX } from 'lucide-react';

import { Student } from '@/app/types/student';

import { StudentsTableRow } from './StudentsTableRow';

interface StudentsTableProps {
    students: Student[];
    onSelect?: (ids: number[]) => void;
}

export const StudentsTable: React.FC<StudentsTableProps> = React.memo(({ students, onSelect }) => {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

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
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* 선택된 항목 표시 */}
            {selectedIds.length > 0 && (
                <div className="bg-blue-50 border-t border-blue-200 px-6 py-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-700">
                            {selectedIds.length}개 항목이 선택되었습니다.
                        </span>
                        <button
                            onClick={() => setSelectedIds([])}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                            선택 해제
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
});

StudentsTable.displayName = 'StudentsTable';