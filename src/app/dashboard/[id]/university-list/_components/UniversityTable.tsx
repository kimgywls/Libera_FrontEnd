import { FC, memo, useCallback } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import FilterPopover from './FilterPopover';
import type { Dispatch, SetStateAction } from 'react';
import type { UniversityItem } from '@/app/types/university';

export interface UniversityTableProps {
    universityList: UniversityItem[];
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
    universityList, selectedItems, handleSelectItem, handleSelectAll,
    recommendTypeLabel, recommendTypeColor,
    showRegionFilter, setShowRegionFilter, allRegions, clearRegionFilter, selectedRegions, setSelectedRegions,
    showTypeFilter, setShowTypeFilter, allTypes, clearTypeFilter, selectedTypes, setSelectedTypes
}) => {
    const handleRegionConfirm = useCallback((values: string[]) => {
        setSelectedRegions(values);
    }, [setSelectedRegions]);

    const handleTypeConfirm = useCallback((values: string[]) => {
        setSelectedTypes(values);
    }, [setSelectedTypes]);

    if (!universityList.length) {
        return (
            <div className="text-center text-gray-400">
                <div className="text-gray-700 bg-gray-100 rounded-md py-5">
                    조건에 맞는 추천 대학이 없습니다.
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto border border-gray-200 bg-white shadow-sm">
            <table className="w-full table-auto divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-violet-600 bg-gray-100 border-gray-300 rounded focus:ring-violet-500 focus:ring-2 accent-violet-600"
                                checked={selectedItems.length === universityList.length && universityList.length > 0}
                                onChange={handleSelectAll}
                            />
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">순서</th>
                        <th
                            className="px-4 py-2 text-left text-sm font-semibold text-gray-700 cursor-pointer relative"
                            onClick={() => setShowRegionFilter(prev => !prev)}
                        >
                            <div className="flex items-center gap-1">
                                지역
                                {showRegionFilter ? <ChevronUp className="w-4 h-4 text-violet-500" /> : <ChevronDown className="w-4 h-4 text-violet-500" />}
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
                                className="absolute left-0 z-10"
                            />
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">대학명</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">전형명</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">학과명</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">전형요소별 평가 비율</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">모집인원</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">25년 입결</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">24년 입결</th>
                        <th
                            className="px-4 py-2 text-left text-sm font-semibold text-gray-700 cursor-pointer relative"
                            onClick={() => setShowTypeFilter(prev => !prev)}
                        >
                            <div className="flex items-center gap-1">
                                판정
                                {showTypeFilter ? <ChevronUp className="w-4 h-4 text-violet-500" /> : <ChevronDown className="w-4 h-4 text-violet-500" />}
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
                <tbody className="divide-y divide-gray-100">
                    {universityList.map((u, index) => (
                        <tr
                            key={u.admission_id ? `uni-${u.admission_id}-${index}` : `uni-tmp-${index}`}
                            className={`hover:bg-gray-50 ${selectedItems.includes(u.admission_id) ? 'bg-violet-50' : ''}`}
                        >
                            <td className="px-4 py-2">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-violet-600 bg-gray-100 border-gray-300 rounded accent-violet-600"
                                    checked={selectedItems.includes(u.admission_id)}
                                    onChange={() => handleSelectItem(u.admission_id)}
                                />
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900">{index + 1}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">
                                <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                                    {u.region}
                                </span>
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900 truncate max-w-[160px]" title={u.university_name}>{u.university_name}</td>
                            <td className="px-4 py-2 text-sm text-gray-900 truncate max-w-[160px]" title={u.admission_type}>{u.admission_type}</td>
                            <td className="px-4 py-2 text-sm text-gray-900 truncate max-w-[160px]" title={u.major_name}>{u.major_name}</td>
                            <td className="px-4 py-2 text-sm text-gray-900 truncate max-w-[160px]" title={u.admission_method}>{u.admission_method}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">{u.recruitment_count}명</td>
                            <td className="px-4 py-2 text-sm text-gray-900">{u.grade_cutoff_current}</td>
                            <td className="px-4 py-2 text-sm text-gray-900">{u.grade_cutoff_prev1}</td>
                            <td className="px-4 py-2">
                                <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${recommendTypeColor[u.recommendation_type] || 'bg-gray-200 text-gray-700'}`}>
                                    {recommendTypeLabel[u.recommendation_type] || u.recommendation_type}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default memo(UniversityTable);
