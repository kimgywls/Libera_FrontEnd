import { FC, memo, useCallback, useEffect, useRef } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import type { UniversityItem } from '@/app/types/university';

import FilterPopover from './FilterPopover';

export interface UniversityTableProps {
    universityList: UniversityItem[];
    selectedItems: number[];
    handleSelectItem: (id: number) => void;
    handleSelectAll: (admissionIds: number[]) => void; // 타입 수정
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
    // 카테고리(전형 유형) 필터 관련
    allCategories: string[];
    showCategoryFilter: boolean;
    setShowCategoryFilter: Dispatch<SetStateAction<boolean>>;
    selectedCategories: string[];
    setSelectedCategories: (values: string[]) => void;
    clearCategoryFilter: () => void;
}

const UniversityTable: FC<UniversityTableProps> = ({
    universityList, selectedItems, handleSelectItem, handleSelectAll,
    recommendTypeLabel, recommendTypeColor,
    showRegionFilter, setShowRegionFilter, allRegions, clearRegionFilter, selectedRegions, setSelectedRegions,
    showTypeFilter, setShowTypeFilter, allTypes, clearTypeFilter, selectedTypes, setSelectedTypes,
    allCategories, showCategoryFilter, setShowCategoryFilter, selectedCategories, setSelectedCategories, clearCategoryFilter
}) => {
    const checkboxRef = useRef<HTMLInputElement>(null);

    const handleRegionConfirm = useCallback((values: string[]) => {
        setSelectedRegions(values);
    }, [setSelectedRegions]);

    const handleTypeConfirm = useCallback((values: string[]) => {
        setSelectedTypes(values);
    }, [setSelectedTypes]);

    // 카테고리(전형 유형) 필터 콜백
    const handleCategoryConfirm = useCallback((values: string[]) => {
        setSelectedCategories(values);
    }, [setSelectedCategories]);

    // 전체 선택 상태 계산 (실제 표시되는 리스트 기준)
    const currentPageIds = universityList.map(u => u.admission_id);
    const selectedInCurrentPage = selectedItems.filter(id => currentPageIds.includes(id));
    const isAllSelected = currentPageIds.length > 0 && selectedInCurrentPage.length === currentPageIds.length;
    const isPartiallySelected = selectedInCurrentPage.length > 0 && selectedInCurrentPage.length < currentPageIds.length;

    // indeterminate 상태 설정
    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = isPartiallySelected;
        }
    }, [isPartiallySelected]);

    // 전체 선택 핸들러 수정
    const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            const allAdmissionIds = universityList.map(u => u.admission_id);
            handleSelectAll(allAdmissionIds);
        } else {
            handleSelectAll([]);
        }
    };

    // 개별 선택 핸들러 디버깅
    const handleSelectItemWithDebug = (admissionId: number) => {
        handleSelectItem(admissionId);
    };

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
        <div className="overflow-x-auto border border-gray-200 bg-white shadow-sm min-h-[500px]">
            <table className="w-full table-auto divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left bf">
                            <input
                                ref={checkboxRef}
                                type="checkbox"
                                className="w-4 h-4 text-violet-600 bg-gray-100 border-gray-300 rounded focus:ring-violet-500 focus:ring-2 accent-violet-600"
                                checked={isAllSelected}
                                onChange={(e) => handleSelectAllChange(e)}
                            />
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">순서</th>
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
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">대학명</th>
                        <th
                            className="px-4 py-2 text-left text-sm font-semibold text-gray-700 cursor-pointer relative"
                            onClick={() => setShowCategoryFilter(prev => !prev)}
                        >
                            <div className="flex items-center gap-1">
                                전형 유형
                                {showCategoryFilter ? <ChevronUp className="w-4 h-4 text-violet-500" /> : <ChevronDown className="w-4 h-4 text-violet-500" />}
                            </div>
                            <FilterPopover
                                show={showCategoryFilter}
                                onClose={() => setShowCategoryFilter(false)}
                                title="전형 유형 선택"
                                options={allCategories}
                                selected={selectedCategories}
                                onConfirm={handleCategoryConfirm}
                                onClear={clearCategoryFilter}
                                widthClass="w-70"
                                className="absolute left-0 z-10"
                            />
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">전형명</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">학과명</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">전형요소별 평가 비율</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">모집인원</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">25년 입결</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">24년 입결</th>
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
                            className={`hover:bg-gray-50 ${selectedItems.includes(u.admission_id) ? 'bg-violet-400/30' : ''}`}
                        >
                            <td className="px-4 py-2 w-10">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-violet-600 bg-gray-100 border-gray-300 rounded accent-violet-600"
                                    checked={selectedItems.includes(u.admission_id)}
                                    onChange={() => handleSelectItemWithDebug(u.admission_id)}
                                />
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900 w-10">{index + 1}</td>
                            <td className="px-4 py-2 text-sm text-gray-900 w-20">
                                <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                                    {u.region}
                                </span>
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900 truncate max-w-[120px]" title={u.university_name}>{u.university_name}</td>
                            <td className="px-4 py-2 text-sm text-gray-900 truncate max-w-[120px]" title={u.admission_category}>{u.admission_category}</td>
                            <td className="px-4 py-2 text-sm text-gray-900 truncate max-w-[120px]" title={u.admission_type}>{u.admission_type}</td>
                            <td className="px-4 py-2 text-sm text-gray-900 truncate max-w-[120px]" title={u.major_name}>{u.major_name}</td>
                            <td className="px-4 py-2 text-sm text-gray-900 break-words whitespace-pre-line max-w-[140px]">{u.admission_method}</td>
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
