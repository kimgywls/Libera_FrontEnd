import { FC } from 'react';
import { ChevronDown, ChevronUp, Eye, RotateCcw } from 'lucide-react';

import { UniversityItem } from '@/app/types/university';

interface HiddenToggleButtonProps {
    showHidden: boolean;
    setShowHidden: (value: boolean | ((prev: boolean) => boolean)) => void;
    hiddenList: UniversityItem[];
    hiddenListLength: number;
    handleUnhide: (admissionId: number) => void;
    handleUnhideAll: () => Promise<void>;
}

const HiddenToggleButton: FC<HiddenToggleButtonProps> = ({
    showHidden,
    setShowHidden,
    hiddenList,
    hiddenListLength,
    handleUnhide,
    handleUnhideAll,
}) => {
    const handleToggle = () => {
        setShowHidden(!showHidden);
    };

    return (
        <div id="hidden-section" className="py-4">
            <div className="flex justify-center mt-4">
                <button
                    onClick={handleToggle}
                    className="group flex items-center space-x-2 bg-white border border-gray-300 hover:border-blue-400 px-5 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                    {showHidden ? (
                        <>
                            <ChevronUp className="w-4 h-4 text-red-500" />
                            <span>숨긴 학교 목록 닫기</span>
                        </>
                    ) : (
                        <>
                            <Eye className="w-4 h-4 text-blue-500" />
                            <span>숨긴 학교 보기</span>
                            {hiddenListLength > 0 && (
                                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-500 rounded-full">
                                    {hiddenListLength}
                                </span>
                            )}
                            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </>
                    )}
                </button>
            </div>

            {showHidden && hiddenListLength > 0 && (
                <div className="px-6 py-4 m-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-base font-semibold text-gray-800">숨긴 학교 목록</h3>
                        <button
                            onClick={handleUnhideAll}
                            className="flex items-center space-x-1 px-3 py-1 text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                        >
                            <RotateCcw className="w-3 h-3" />
                            <span className="text-white">전체 해제</span>
                        </button>
                    </div>
                    <ul className="space-y-2">
                        {hiddenList.map((u, index) => (
                            <li
                                key={`hidden-${u.admission_id}-${index}`}
                                className="flex items-center justify-between border border-gray-200 rounded-md px-4 py-2 bg-white hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center space-x-2 text-sm text-gray-700 truncate">
                                    <span className="font-medium text-gray-900">{u.university_name}</span>
                                    <span className="text-gray-400">|</span>
                                    <span>{u.major_name}</span>
                                    <span className="text-gray-400">|</span>
                                    <span>{u.admission_type}</span>
                                </div>
                                <button
                                    className="ml-4 px-3 py-1 text-sm bg-slate-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                    onClick={() => handleUnhide(u.admission_id)}
                                >
                                    해제
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HiddenToggleButton;
