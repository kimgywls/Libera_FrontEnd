import { FC, memo, useState, useMemo, useCallback } from 'react';
import type { SchoolRecommendationResponse } from '@/app/types/school-recommendation';
import { Filter, X, Search } from 'lucide-react';

interface RecommanedUniversityListSectionProps {
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

const RecommanedUniversityListSection: FC<RecommanedUniversityListSectionProps> = memo(
    ({ data, loading, error }) => {
        const [selectedTab, setSelectedTab] = useState(0);
        const [selectedItems, setSelectedItems] = useState<number[]>([]);
        const searchFields = [
            { value: 'university_name', label: '대학명' },
            { value: 'admission_type', label: '전형명' },
            { value: 'major_name', label: '학과명' },
        ];
        const [searchField, setSearchField] = useState('university_name');
        const [searchInput, setSearchInput] = useState('');
        const [searchText, setSearchText] = useState('');
        const handleSearch = () => setSearchText(searchInput);
        const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') handleSearch();
        };
        const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
        const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
        const [showRegionFilter, setShowRegionFilter] = useState(false);
        const [showTypeFilter, setShowTypeFilter] = useState(false);
        const clearRegionFilter = () => setSelectedRegions([]);
        const clearTypeFilter = () => setSelectedTypes([]);
        const toggleRegion = (region: string) => {
            setSelectedRegions(prev =>
                prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
            );
        };
        const toggleType = (type: string) => {
            setSelectedTypes(prev =>
                prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
            );
        };

        const handleTabClick = useCallback((idx: number) => setSelectedTab(idx), []);

        const handleSelectItem = useCallback((admissionId: number) => {
            setSelectedItems(prev =>
                prev.includes(admissionId)
                    ? prev.filter(id => id !== admissionId)
                    : [...prev, admissionId]
            );
        }, []);

        const departments = data?.departments || [];
        const displayDepartments = departments;
        const displayTabLabels = ['전체보기', ...displayDepartments.map((dept) => dept.department_name)];
        const displayUniversityList = useMemo(() => {
            if (selectedTab === 0) {
                return displayDepartments.flatMap((dept) => [
                    ...dept.challenge,
                    ...dept.suitable,
                    ...dept.safe,
                ]);
            } else {
                const dept = displayDepartments[selectedTab - 1];
                if (!dept) return [];
                return [
                    ...dept.challenge,
                    ...dept.suitable,
                    ...dept.safe,
                ];
            }
        }, [displayDepartments, selectedTab]);

        const handleSelectAll = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.checked) {
                setSelectedItems(displayUniversityList.map(u => u.admission_id));
            } else {
                setSelectedItems([]);
            }
        }, [displayUniversityList]);

        // region, recommendation_type 목록 추출
        const allRegions = useMemo(() => {
            const set = new Set<string>();
            displayUniversityList.forEach(u => {
                if (u.region) set.add(u.region);
            });
            return Array.from(set);
        }, [displayUniversityList]);
        const allTypes = useMemo(() => {
            const set = new Set<string>();
            displayUniversityList.forEach(u => {
                if (u.recommendation_type) set.add(u.recommendation_type);
            });
            return Array.from(set);
        }, [displayUniversityList]);

        // 필터/검색 적용
        const filteredUniversityList = useMemo(() => {
            return displayUniversityList.filter(u => {
                // 검색
                const search = searchText.trim().toLowerCase();
                let matchesSearch = true;
                if (search) {
                    if (['university_name', 'admission_type', 'major_name'].includes(searchField)) {
                        matchesSearch = (u as any)[searchField]?.toLowerCase().includes(search);
                    } else {
                        matchesSearch = false;
                    }
                }
                // 지역 필터
                const matchesRegion =
                    selectedRegions.length === 0 || selectedRegions.includes(u.region);
                // 판정 필터
                const matchesType =
                    selectedTypes.length === 0 || selectedTypes.includes(u.recommendation_type);
                return matchesSearch && matchesRegion && matchesType;
            });
        }, [displayUniversityList, searchText, searchField, selectedRegions, selectedTypes]);

        // 필터 체크박스 핸들러
        const handleRegionChange = (region: string) => {
            setSelectedRegions(prev =>
                prev.includes(region)
                    ? prev.filter(r => r !== region)
                    : [...prev, region]
            );
        };
        const handleTypeChange = (type: string) => {
            setSelectedTypes(prev =>
                prev.includes(type)
                    ? prev.filter(t => t !== type)
                    : [...prev, type]
            );
        };
        const handleResetFilters = () => {
            setSearchText('');
            setSelectedRegions([]);
            setSelectedTypes([]);
        };

        if (loading) {
            return (
                <div className="flex items-center justify-center py-16">
                    <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="text-gray-600 font-medium">추천 학교를 불러오는 중...</span>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex items-center justify-center py-16">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.95-.833-2.72 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">추천 학교를 불러오지 못했습니다</h3>
                        <p className="text-gray-600">잠시 후 다시 시도해주세요.</p>
                    </div>
                </div>
            );
        }

        if (!data || data.departments.length === 0) {
            return (
                <div className="flex items-center justify-center py-16">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">추천 데이터가 없습니다</h3>
                        <p className="text-gray-600">성적을 입력하면 추천 학교가 표시됩니다.</p>
                    </div>
                </div>
            );
        }

        return (
            <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* 헤더 */}
                <div className="bg-white px-8 py-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">추천 학교 리스트</h2>
                    <p className="text-gray-600 text-sm">
                        총 {displayUniversityList.length}개의 추천 학교가 있습니다
                    </p>
                </div>

                <div className="bg-white border-b border-gray-200">
                    <div className="px-8 py-6">
                        {/* 탭 버튼 */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {displayTabLabels.map((label, idx) => (
                                <button
                                    key={label}
                                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${selectedTab === idx
                                        ? 'bg-violet-600 text-white shadow-lg shadow-violet-200'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                                        }`}
                                    onClick={() => handleTabClick(idx)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        {/* 검색 및 필터 */}
                        <div className="flex flex-wrap gap-4 items-center ">
                            <select
                                className="border border-gray-300 rounded-xl py-3 px-4 text-gray-700 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white shadow-sm"
                                value={searchField}
                                onChange={e => setSearchField(e.target.value)}
                            >
                                {searchFields.map(field => (
                                    <option key={field.value} value={field.value}>{field.label}</option>
                                ))}
                            </select>

                            <div className="relative flex-1 max-w-md text-gray-700">
                                <input
                                    type="text"
                                    placeholder="검색어를 입력하세요..."
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 shadow-sm"
                                    value={searchInput}
                                    onChange={e => setSearchInput(e.target.value)}
                                    onKeyDown={handleInputKeyDown}
                                />
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            </div>

                            <button
                                onClick={handleSearch}
                                className="px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200"
                            >
                                검색
                            </button>

                            {/* 지역 필터 */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowRegionFilter(!showRegionFilter)}
                                    className={`flex items-center space-x-2 px-4 py-3 border rounded-xl transition-colors shadow-sm ${selectedRegions.length > 0
                                        ? 'bg-violet-50 border-violet-300 text-violet-700'
                                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <Filter className="w-4 h-4" />
                                    <span>지역 {selectedRegions.length > 0 && `(${selectedRegions.length})`}</span>
                                </button>
                                {showRegionFilter && (
                                    <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-xl shadow-2xl z-10 w-80">
                                        <div className="p-4 border-b border-gray-200">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-semibold text-gray-900">지역 선택</h3>
                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        onClick={clearRegionFilter}
                                                        className="text-sm text-gray-500 hover:text-violet-600"
                                                    >
                                                        초기화
                                                    </button>
                                                    <button onClick={() => setShowRegionFilter(false)}>
                                                        <X className="w-4 h-4 text-gray-600 hover:text-violet-600" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 grid grid-cols-2 gap-3">
                                            {allRegions.map(region => (
                                                <label key={region} className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRegions.includes(region)}
                                                        onChange={() => toggleRegion(region)}
                                                        className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                                                    />
                                                    <span className="text-sm text-gray-700">{region}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* 판정 필터 */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowTypeFilter(!showTypeFilter)}
                                    className={`flex items-center space-x-2 px-4 py-3 border rounded-xl transition-colors shadow-sm ${selectedTypes.length > 0
                                        ? 'bg-violet-50 border-violet-300 text-violet-700'
                                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <Filter className="w-4 h-4" />
                                    <span>판정 {selectedTypes.length > 0 && `(${selectedTypes.length})`}</span>
                                </button>
                                {showTypeFilter && (
                                    <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-xl shadow-2xl z-10 w-60">
                                        <div className="p-4 border-b border-gray-200">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-semibold text-gray-900">판정 선택</h3>
                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        onClick={clearTypeFilter}
                                                        className="text-sm text-gray-500 hover:text-violet-600"
                                                    >
                                                        초기화
                                                    </button>
                                                    <button onClick={() => setShowTypeFilter(false)}>
                                                        <X className="w-4 h-4 text-gray-600 hover:text-violet-600" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 flex flex-col gap-3">
                                            {allTypes.map(type => (
                                                <label key={type} className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedTypes.includes(type)}
                                                        onChange={() => toggleType(type)}
                                                        className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                                                    />
                                                    <span className="text-sm text-gray-700">{RECOMMEND_TYPE_LABEL[type] || type}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleResetFilters}
                                className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-colors"
                            >
                                초기화
                            </button>
                        </div>
                    </div>
                </div>


                {/* 테이블 */}
                <div className="overflow-x-auto">
                    <table className="w-full table-fixed border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="w-12 px-4 py-3 text-left border-r border-gray-200">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                        checked={selectedItems.length === displayUniversityList.length && displayUniversityList.length > 0}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th className="w-16 px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">순서</th>
                                <th className="w-20 px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">지역</th>
                                <th className="w-36 px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">대학명</th>
                                <th className="w-32 px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">전형명</th>
                                <th className="w-36 px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">학과명</th>
                                <th className="w-48 px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">전형요소별 평가 비율</th>
                                <th className="w-20 px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">모집인원</th>
                                <th className="w-24 px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">25년 입결</th>
                                <th className="w-24 px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">24년 입결</th>
                                <th className="w-20 px-4 py-3 text-left text-sm font-semibold text-gray-700">판정</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {filteredUniversityList.length === 0 ? (
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
                                filteredUniversityList.map((u, index) => (
                                    <tr
                                        key={u.admission_id}
                                        className={`hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 ${selectedItems.includes(u.admission_id) ? 'bg-blue-50' : ''
                                            }`}
                                    >
                                        <td className="px-4 py-3 border-r border-gray-200">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                                checked={selectedItems.includes(u.admission_id)}
                                                onChange={() => handleSelectItem(u.admission_id)}
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-3 border-r border-gray-200">
                                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                                                {u.region}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 border-r border-gray-200">
                                            <div className="text-sm font-medium text-gray-900 truncate" title={u.university_name}>
                                                {u.university_name}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 border-r border-gray-200">
                                            <div className="text-sm text-gray-700 truncate" title={u.admission_type}>
                                                {u.admission_type}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 border-r border-gray-200">
                                            <div className="text-sm font-medium text-gray-900 truncate" title={u.major_name}>
                                                {u.major_name}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 border-r border-gray-200">
                                            <div className="text-sm text-gray-700 truncate" title={u.admission_method}>
                                                {u.admission_method}
                                            </div>
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
                                            <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${RECOMMEND_TYPE_COLOR[u.recommendation_type] || 'bg-gray-200 text-gray-700 border-gray-300'
                                                }`}>
                                                {RECOMMEND_TYPE_LABEL[u.recommendation_type] || u.recommendation_type}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 선택된 항목 표시 */}
                {selectedItems.length > 0 && (
                    <div className="bg-violet-50 border-t border-violet-200 px-8 py-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-violet-700">
                                {selectedItems.length}개 학교가 선택되었습니다
                            </span>
                            <button
                                onClick={() => setSelectedItems([])}
                                className="text-sm text-violet-600 hover:text-violet-800 font-medium"
                            >
                                선택 해제
                            </button>
                        </div>
                    </div>
                )}
            </section>
        );
    }
);

RecommanedUniversityListSection.displayName = 'RecommanedUniversityListSection';

export default RecommanedUniversityListSection; 