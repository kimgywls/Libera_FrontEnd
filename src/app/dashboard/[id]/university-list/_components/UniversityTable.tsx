import { FC, memo, useCallback } from 'react';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import FilterPopover from './FilterPopover';
import type { Dispatch, SetStateAction } from 'react';

export interface UniversityTableProps {
    universityList: any[];
    selectedItems: number[];
    handleSelectItem: (id: number) => void;
    handleSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
    recommendTypeLabel: Record<string, string>;
    recommendTypeColor: Record<string, string>;
    showRegionFilter: boolean;
    setShowRegionFilter: Dispatch<SetStateAction<boolean>>;
    allRegions: string[];
    clearRegionFilter: () => void;
    selectedRegions: string[];
    setSelectedRegions: (values: string[]) => void;
    showTypeFilter: boolean;
    setShowTypeFilter: Dispatch<SetStateAction<boolean>>;
    allTypes: string[];
    clearTypeFilter: () => void;
    selectedTypes: string[];
    setSelectedTypes: (values: string[]) => void;
}

const UniversityTable: FC<UniversityTableProps> = ({
    universityList, selectedItems, handleSelectItem, handleSelectAll, recommendTypeLabel, recommendTypeColor,
    showRegionFilter, setShowRegionFilter, allRegions, clearRegionFilter, selectedRegions, setSelectedRegions,
    showTypeFilter, setShowTypeFilter, allTypes, clearTypeFilter, selectedTypes, setSelectedTypes
}) => {
    const handleRegionConfirm = useCallback((values: string[]) => {
        setSelectedRegions(values);
    }, [setSelectedRegions]);
    const handleTypeConfirm = useCallback((values: string[]) => {
        setSelectedTypes(values);
    }, [setSelectedTypes]);
    return (
        <div className="overflow-x-auto min-h-[500px] pb-4">
            <table className="w-full table-fixed border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="w-12 px-4 py-3 text-left border-r border-gray-200">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-violet-600 bg-gray-100 border-gray-300 rounded focus:ring-violet-500 focus:ring-2 accent-violet-600"
                                checked={selectedItems.length === universityList.length && universityList.length > 0}
                                onChange={handleSelectAll}
                            />
                        </th>
                        <th className="w-16 px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">순서</th>
                        <th className="w-20 px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200 relative cursor-pointer"
                            onClick={() => setShowRegionFilter((prev: boolean) => !prev)}
                        >
                            <div className="flex items-center gap-1">
                                지역
                                {showRegionFilter ? <ChevronUp className="w-5 h-5 text-violet-500" /> : <ChevronDown className="w-5 h-5 text-violet-500" />}
                            </div>
                            <FilterPopover
                                show={showRegionFilter}
                                onClose={() => setShowRegionFilter(false)}
                                title="지역 선택"
                                options={allRegions}
                                selected={selectedRegions}
                                onConfirm={handleRegionConfirm}
                                onClear={clearRegionFilter}
                                widthClass="w-80"
                                className="absolute left-0  z-10"
                            />
                        </th>
                        <th className="w-36 px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">대학명</th>
                        <th className="w-32 px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">전형명</th>
                        <th className="w-36 px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">학과명</th>
                        <th className="w-48 px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">전형요소별 평가 비율</th>
                        <th className="w-20 px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">모집인원</th>
                        <th className="w-24 px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">25년 입결</th>
                        <th className="w-24 px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">24년 입결</th>
                        <th className="w-20 px-4 py-3 text-left text-sm font-semibold text-gray-700 relative cursor-pointer"
                            onClick={() => setShowTypeFilter((prev: boolean) => !prev)}
                        >
                            <div className="flex items-center gap-1">
                                판정
                                {showTypeFilter ? <ChevronUp className="w-5 h-5 text-violet-500" /> : <ChevronDown className="w-5 h-5 text-violet-500" />}
                            </div>
                            <FilterPopover
                                show={showTypeFilter}
                                onClose={() => setShowTypeFilter(false)}
                                title="판정 선택"
                                options={allTypes}
                                selected={selectedTypes}
                                onConfirm={handleTypeConfirm}
                                onClear={clearTypeFilter}
                                widthClass="w-60"
                                recommendTypeLabel={recommendTypeLabel}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {universityList.length === 0 ? (
                        <tr>
                            <td colSpan={12} className="px-6 py-16 text-center border-b border-gray-200">
                                <div className="flex flex-col items-center space-y-3">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-500 font-medium">조건에 맞는 추천 대학이 없습니다</span>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        universityList.map((u, index) => (
                            <tr
                                key={u.admission_id}
                                className={`hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 ${selectedItems.includes(u.admission_id) ? 'bg-violet-50' : ''}`}
                            >
                                <td className="px-4 py-3 border-r border-gray-200">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-violet-600 bg-gray-100 border-gray-300 rounded accent-violet-600"
                                        checked={selectedItems.includes(u.admission_id)}
                                        onChange={() => handleSelectItem(u.admission_id)}
                                    />
                                </td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">{index + 1}</td>
                                <td className="px-4 py-3 border-r border-gray-200">
                                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">{u.region}</span>
                                </td>
                                <td className="px-4 py-3 border-r border-gray-200">
                                    <div className="text-sm font-medium text-gray-900 truncate" title={u.university_name}>{u.university_name}</div>
                                </td>
                                <td className="px-4 py-3 border-r border-gray-200">
                                    <div className="text-sm text-gray-700 truncate" title={u.admission_type}>{u.admission_type}</div>
                                </td>
                                <td className="px-4 py-3 border-r border-gray-200">
                                    <div className="text-sm font-medium text-gray-900 truncate" title={u.major_name}>{u.major_name}</div>
                                </td>
                                <td className="px-4 py-3 border-r border-gray-200">
                                    <div className="text-sm text-gray-700 truncate" title={u.admission_method}>{u.admission_method}</div>
                                </td>
                                <td className="px-4 py-3 border-r border-gray-200">
                                    <div className="text-sm font-medium text-gray-900">{u.recruitment_count}명</div>
                                </td>
                                <td className="px-4 py-3 border-r border-gray-200">
                                    <div className="text-sm font-medium text-gray-900">{u.grade_cutoff_current}</div>
                                </td>
                                <td className="px-4 py-3 border-r border-gray-200">
                                    <div className="text-sm font-medium text-gray-900">{u.grade_cutoff_prev1}</div>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${recommendTypeColor[u.recommendation_type] || 'bg-gray-200 text-gray-700 border-gray-300'}`}>{recommendTypeLabel[u.recommendation_type] || u.recommendation_type}</span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default memo(UniversityTable); 