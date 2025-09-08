import React from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

import { Student } from '@/app/types/student';
import { useCheckThirdGradeScores } from '../_hooks/use-check-third-grade-scores';
import {
    completionStatusMap,
    getStatusStyle,
    getThirdGradeStatusStyle,
    getThirdGradeStatusText
} from '../_utils/status-utils';

interface StudentsTableRowProps {
    student: Student;
    index: number;
    selected: boolean;
    onSelect: (id: number) => void;
    onRequestDelete: (student: Student) => void;
    isDeleting?: boolean;
}

export const StudentsTableRow: React.FC<StudentsTableRowProps> = React.memo(
    ({ student, index, selected, onSelect, onRequestDelete, isDeleting = false }) => {
        const router = useRouter();

        // 3학년 1학기 성적 확인
        const { data: scoresData, isLoading: scoresLoading } = useCheckThirdGradeScores(student.id);

        const handleCheckboxClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            onSelect(student.id);
        };

        const handleDeleteClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            onRequestDelete(student);
        };

        const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
            // 클릭된 요소가 td인 경우에만 라우팅 처리
            const target = e.target as HTMLElement;
            const cell = target.closest('td');

            // 첫 번째(체크박스)나 마지막(삭제 버튼) td가 아닌 경우에만 라우팅
            if (cell && !cell.matches('td:first-child, td:last-child')) {
                router.push(`/dashboard/${student.id}/scores`);
            }
        };

        // 3학년 성적 상태 계산
        const hasThirdGradeScores = scoresData?.hasThirdGradeScores || false;
        const thirdGradeStatusText = getThirdGradeStatusText(hasThirdGradeScores, scoresLoading);
        const thirdGradeStatusStyle = getThirdGradeStatusStyle(hasThirdGradeScores);

        return (
            <tr
                className={`hover:bg-gray-50 transition-colors duration-200 ${selected ? 'bg-blue-50' : ''} cursor-pointer`}
                onClick={handleRowClick}
            >
                <td className="w-12 px-2 py-4 whitespace-nowrap" onClick={e => e.stopPropagation()}>
                    <input
                        type="checkbox"
                        checked={selected}
                        onClick={handleCheckboxClick}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        readOnly
                    />
                </td>
                <td className="w-16 px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                </td>
                <td className="w-20 px-2 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 truncate">{student.name}</div>
                </td>
                <td className="w-32 px-2 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700 font-mono truncate">{student.phone_number}</div>
                </td>
                <td className="w-40 px-2 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700 truncate">{student.current_school_name}</div>
                </td>
                <td className="w-40 px-2 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 truncate">
                        {student.desired_school === 'none' ? '-' : student.desired_school}
                    </div>
                </td>
                <td className="w-32 px-2 py-4">
                    <div className="text-sm text-gray-700">
                        {!student.desired_department || student.desired_department === 'none' ? '-' :
                            student.desired_department.split(',').map((dept, index) => (
                                <div key={index} className="truncate">
                                    {dept.trim()}
                                </div>
                            ))
                        }
                    </div>
                </td>
                <td className="w-24 px-2 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyle(student.completion_status)}`}>
                            {completionStatusMap[student.completion_status]}
                        </span>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${thirdGradeStatusStyle}`}>
                            {thirdGradeStatusText}
                        </span>
                    </div>
                </td>
                <td className="w-16 px-2 py-4 whitespace-nowrap" onClick={e => e.stopPropagation()}>
                    <button
                        onClick={handleDeleteClick}
                        disabled={isDeleting}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </td>
            </tr>
        );
    }
);

StudentsTableRow.displayName = 'StudentsTableRow'; 