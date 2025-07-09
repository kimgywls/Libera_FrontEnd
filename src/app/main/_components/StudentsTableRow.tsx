import React from 'react';
import { useRouter } from 'next/navigation';
import { Student } from '@/app/types/student';

interface StudentsTableRowProps {
    student: Student;
    index: number;
    selected: boolean;
    onSelect: (id: number) => void;
}

const completionStatusMap: Record<Student['completion_status'], string> = {
    '완료': '완료',
    '성적만 완료': '성적만 완료',
    '출결만 완료': '출결만 완료',
    '미완료': '미완료',
};

const getStatusStyle = (status: Student['completion_status']) => {
    switch (status) {
        case '완료':
            return 'bg-green-100 text-green-800 border-green-200';
        case '성적만 완료':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case '출결만 완료':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case '미완료':
            return 'bg-red-100 text-red-800 border-red-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

export const StudentsTableRow: React.FC<StudentsTableRowProps> = React.memo(
    ({ student, index, selected, onSelect }) => {
        const router = useRouter();

        const handleCheckboxClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            onSelect(student.id);
        };

        const handleRowClick = () => {
            router.push(`/dashboard/${student.id}/scores`);
        };

        return (
            <tr
                className={`hover:bg-gray-50 transition-colors duration-200 ${selected ? 'bg-blue-50' : ''} cursor-pointer`}
                onClick={handleRowClick}
            >
                <td className="px-6 py-4 whitespace-nowrap">
                    <input
                        type="checkbox"
                        checked={selected}
                        onClick={handleCheckboxClick}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        readOnly
                    />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700 font-mono">{student.phone_number}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{student.current_school_name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{student.desired_school}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{student.desired_department}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(student.completion_status)}`}>
                        {completionStatusMap[student.completion_status]}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <button
                        className="text-sm text-violet-600 hover:text-violet-800 hover:underline font-medium"
                        onClick={e => e.stopPropagation()}
                    >
                        출력물 다운로드
                    </button>
                </td>
            </tr>
        );
    }
);

StudentsTableRow.displayName = 'StudentsTableRow'; 