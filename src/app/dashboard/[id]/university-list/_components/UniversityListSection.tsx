import { FC, memo, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import type { SchoolRecommendationResponse, UniversityItem } from '@/app/types/university';

import { AlertModal } from '@/app/components/modal/AlertModal';

import { useFilteredUniversityList } from '../_hooks/use-filtered-university-list';
import { useUniversityHide } from '../_hooks/use-university-hide';
import { useUniversityListFilter } from '../_hooks/use-university-list-filter';
import { useUniversityListSearch } from '../_hooks/use-university-list-search';
import { useUniversityListTab } from '../_hooks/use-university-list-tab';

import HiddenToggleButton from './HiddenToggleButton';
import MajorTabNav from './MajorTabNav';
import SearchBar from './SearchBar';
import UniversityListStatus from './UniversityListStatus';
import UniversityTable from './UniversityTable';
import UniversityTableActions from './UniversityTableActions';

interface UniversityListSectionProps {
    data: SchoolRecommendationResponse | null;
    loading: boolean;
    error: Error | null;
}

const RECOMMEND_TYPE_LABEL: Record<string, string> = {
    '도전': '도전',
    '적정': '적정',
    '안정': '안정',
};
const RECOMMEND_TYPE_COLOR: Record<string, string> = {
    '도전': 'bg-red-100 text-red-600',
    '적정': 'bg-blue-100 text-blue-600',
    '안정': 'bg-green-100 text-green-600',
};

const UniversityListSection: FC<UniversityListSectionProps> = memo(
    ({ data, loading, error }) => {
        const pathname = usePathname();

        // 숨기기 관련 통합 훅 (먼저 호출)
        const {
            hiddenList, showHidden, setShowHidden,
            handleHideList, handleUnhide, handleUnhideAll,
            selectedItems, handleSelectItem, handleSelectAll,
            alert
        } = useUniversityHide(data);

        // URL 해시에 따라 숨김 목록 자동 표시
        useEffect(() => {
            const hash = pathname.split('#')[1];
            if (hash === 'hidden-section') {
                setShowHidden(true);
                // 스크롤을 위해 약간의 지연
                setTimeout(() => {
                    const element = document.getElementById('hidden-section');
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            }
        }, [pathname, setShowHidden]);

        // 탭/검색/필터 관련 훅 (숨긴 학교 목록 전달) - hiddenList가 변경될 때마다 재계산
        const {
            selectedTab,
            handleTabClick,
            displayTabLabels,
            displayUniversityList,
        } = useUniversityListTab(data, hiddenList);
        const {
            searchFields,
            searchField,
            setSearchField,
            searchInput,
            setSearchInput,
            searchText,
            handleSearch,
            handleInputKeyDown,
            handleResetSearchBar,
        } = useUniversityListSearch();
        const {
            selectedRegions,
            setSelectedRegions,
            selectedTypes,
            setSelectedTypes,
            selectedCategories,
            setSelectedCategories,
            showRegionFilter,
            setShowRegionFilter,
            showTypeFilter,
            setShowTypeFilter,
            showCategoryFilter,
            setShowCategoryFilter,
            clearRegionFilter,
            clearTypeFilter,
            clearCategoryFilter,
            allRegions,
            allTypes,
            allCategories,
            handleResetFilters,
        } = useUniversityListFilter(displayUniversityList);

        // 필터/탭/검색 적용된 리스트
        const filteredUniversityList: UniversityItem[] = useFilteredUniversityList(
            displayUniversityList,
            searchText,
            searchField as keyof UniversityItem,
            selectedRegions,
            selectedTypes,
            selectedCategories
        );

        // 숨긴 학교 목록에서 제외한 학교들
        const visibleUniversityList = filteredUniversityList.filter(
            (university) => !hiddenList.some((hidden) => hidden.admission_id === university.admission_id)
        );

        const regionCount = selectedRegions.length;
        const typeCount = selectedTypes.length;
        const categoryCount = selectedCategories.length;
        const hasActiveFilters = regionCount > 0 || typeCount > 0 || categoryCount > 0;
        const hasData = !!data && data.departments.length > 0;

        if (loading || error || !hasData) {
            return (
                <UniversityListStatus loading={loading} error={error} hasData={hasData} />
            );
        }

        return (
            <section className="w-full bg-white rounded-lg min-h-[800px] overflow-hidden">
                {/* 헤더 */}
                <div className="px-8 py-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">추천 학교 리스트</h2>
                    <p className="text-gray-600 text-sm">
                        총 {visibleUniversityList.length}개의 추천 학교가 있습니다
                    </p>
                </div>
                <div className="border-b border-gray-200">
                    <div className="flex flex-col px-4 pt-4 pb-2 gap-2">
                        <SearchBar
                            searchFields={searchFields}
                            searchField={searchField}
                            setSearchField={setSearchField}
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                            handleSearch={handleSearch}
                            handleInputKeyDown={handleInputKeyDown}
                            handleResetSearchBar={handleResetSearchBar}
                        />
                        <div className="flex items-center justify-between">
                            <MajorTabNav labels={displayTabLabels} selected={selectedTab} onSelect={handleTabClick} />
                            <UniversityTableActions
                                hasActiveFilters={hasActiveFilters}
                                regionCount={regionCount}
                                typeCount={typeCount}
                                categoryCount={categoryCount}
                                handleResetFilters={handleResetFilters}
                                onHide={handleHideList}
                            />
                        </div>

                    </div>
                </div>
                <UniversityTable
                    universityList={visibleUniversityList}
                    selectedItems={selectedItems}
                    handleSelectItem={handleSelectItem}
                    handleSelectAll={handleSelectAll}
                    recommendTypeLabel={RECOMMEND_TYPE_LABEL}
                    recommendTypeColor={RECOMMEND_TYPE_COLOR}
                    showRegionFilter={showRegionFilter}
                    setShowRegionFilter={setShowRegionFilter}
                    allRegions={allRegions}
                    clearRegionFilter={clearRegionFilter}
                    selectedRegions={selectedRegions}
                    setSelectedRegions={setSelectedRegions}
                    showTypeFilter={showTypeFilter}
                    setShowTypeFilter={setShowTypeFilter}
                    allTypes={allTypes}
                    clearTypeFilter={clearTypeFilter}
                    selectedTypes={selectedTypes}
                    setSelectedTypes={setSelectedTypes}
                    // 카테고리 필터 관련
                    allCategories={allCategories}
                    showCategoryFilter={showCategoryFilter}
                    setShowCategoryFilter={setShowCategoryFilter}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    clearCategoryFilter={clearCategoryFilter}
                />

                {/* 숨긴 학교 토글 버튼 및 목록 */}
                <HiddenToggleButton
                    showHidden={showHidden}
                    setShowHidden={setShowHidden}
                    hiddenListLength={hiddenList.length}
                    hiddenList={hiddenList}
                    handleUnhide={handleUnhide}
                    handleUnhideAll={handleUnhideAll}
                />
                <AlertModal
                    open={alert.open}
                    title={alert.title}
                    description={alert.description}
                    onConfirm={alert.onConfirm}
                    onCancel={alert.onConfirm}
                />
            </section >
        );
    }
);

UniversityListSection.displayName = 'UniversityListSection';

export default UniversityListSection; 