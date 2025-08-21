import { FC } from 'react';
import { X } from 'lucide-react';

import { DesiredSchool } from '@/app/types/university';
interface DesiredSchoolListProps {
    desiredSchools: DesiredSchool[];
    onDelete: (id: number) => void;
}

const DesiredSchoolList: FC<DesiredSchoolListProps> = ({ desiredSchools, onDelete }) => (
    <div className="flex flex-wrap gap-2">
        {desiredSchools.length === 0 ? (
            <span className="text-gray-500 italic">설정된 진학 목표가 없습니다</span>
        ) : desiredSchools.map((department, index) => (
            <div key={department.id ? `dep-${department.id}` : `dep-tmp-${index}`} className="group relative">
                <div className="flex items-center bg-white hover:bg-red-100 border border-red-200 rounded-full px-3 py-2 transition-all duration-200 cursor-pointer">
                    <span className="text-sm font-medium text-gray-800 select-none">
                        {department.school_name === "none" ? <span>&nbsp;-</span> : department.school_name} • {department.department_name === "none" ? <span>&nbsp;-</span> : department.department_name}
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 flex items-cente transition-opacity duration-200">
                        <button className="text-red-500 hover:text-red-700 transition-colors" onClick={() => onDelete(department.id)} title="학과 삭제">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default DesiredSchoolList; 