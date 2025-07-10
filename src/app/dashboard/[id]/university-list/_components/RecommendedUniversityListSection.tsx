import { FC, memo, useState, useCallback } from 'react';
import type { SchoolRecommendationResponse } from '@/app/types/school-recommendation';
import type { UniversityItem } from '@/app/types/university';
import TabNav from './TabNav';
import SearchBar from './SearchBar';
import UniversityTable from './UniversityTable';
import ActiveFilterButtons from './ActiveFilterButtons';
import RecommendationStatus from './RecommendationStatus';
import { useUniversityListTab } from '../_hooks/useUniversityListTab';
import { useUniversityListSearch } from '../_hooks/useUniversityListSearch';
import { useUniversityListFilter } from '../_hooks/useUniversityListFilter';
import { useFilteredUniversityList } from '../_hooks/useFilteredUniversityList';

interface RecommendedUniversityListSectionProps {
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

const RecommendedUniversityListSection: FC<RecommendedUniversityListSectionProps> = memo(
    ({ data, loading, error }) => {
        // 탭 관련 훅
        const {
            selectedTab,
            //setSelectedTab,
            handleTabClick,
            displayTabLabels,
            displayUniversityList,
        } = useUniversityListTab(data);

        // 검색 관련 훅
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

        // 필터 관련 훅
        const {
            selectedRegions,
            setSelectedRegions,
            selectedTypes,
            setSelectedTypes,
            showRegionFilter,
            setShowRegionFilter,
            showTypeFilter,
            setShowTypeFilter,
            clearRegionFilter,
            clearTypeFilter,
            allRegions,
            allTypes,
            handleResetFilters,
        } = useUniversityListFilter(displayUniversityList);

        // 검색/필터/탭 적용된 리스트
        const filteredUniversityList: UniversityItem[] = useFilteredUniversityList(
            displayUniversityList,
            searchText,
            searchField as keyof UniversityItem,
            selectedRegions,
            selectedTypes
        );

        // 선택 관련(기존 유지)
        const [selectedItems, setSelectedItems] = useState<number[]>([]);
        const handleSelectItem = useCallback((admissionId: number) => {
            setSelectedItems(prev =>
                prev.includes(admissionId)
                    ? prev.filter(id => id !== admissionId)
                    : [...prev, admissionId]
            );
        }, []);
        const handleSelectAll = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.checked) {
                setSelectedItems(filteredUniversityList.map(u => u.admission_id));
            } else {
                setSelectedItems([]);
            }
        }, [filteredUniversityList]);

        // 기타
        const handleSendList = () => {
            console.log('send');
        };
        const regionCount = selectedRegions.length;
        const typeCount = selectedTypes.length;
        const hasActiveFilters = regionCount > 0 || typeCount > 0;
        const hasData = !!data && data.departments.length > 0;
        if (loading || error || !hasData) {
            return (
                <RecommendationStatus loading={loading} error={error} hasData={hasData} />
            );
        }

        return (
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[800px] overflow-hidden">
                {/* 헤더 */}
                <div className="bg-white px-8 py-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">추천 학교 리스트</h2>
                    <p className="text-gray-600 text-sm">
                        총 {filteredUniversityList.length}개의 추천 학교가 있습니다
                    </p>
                </div>
                <div className="bg-white border-b border-gray-200">
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
                            <TabNav labels={displayTabLabels} selected={selectedTab} onSelect={handleTabClick} />
                            <ActiveFilterButtons
                                hasActiveFilters={hasActiveFilters}
                                regionCount={regionCount}
                                typeCount={typeCount}
                                handleResetFilters={handleResetFilters}
                                onSend={handleSendList}
                            />
                        </div>
                    </div>
                </div>
                <UniversityTable
                    universityList={filteredUniversityList}
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
                />
            </section >
        );
    }
);

RecommendedUniversityListSection.displayName = 'RecommendedUniversityListSection';

export default RecommendedUniversityListSection; 