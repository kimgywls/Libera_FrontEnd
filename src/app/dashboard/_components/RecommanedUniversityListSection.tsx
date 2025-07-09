import { FC, memo, useState, useMemo, useCallback } from 'react';
import type { SchoolRecommendationResponse, DepartmentRecommendation } from '@/app/types/school-recommendation';

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

                {/* 탭 버튼 */}
                <div className="bg-gray-50 px-8 py-4 border-b border-gray-200">
                    <div className="flex flex-wrap gap-1 border-b border-gray-200">
                        {displayTabLabels.map((label, idx) => (
                            <button
                                key={label}
                                className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${selectedTab === idx
                                    ? 'border-blue-600 text-blue-600 bg-white'
                                    : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-gray-300'
                                    }`}
                                onClick={() => handleTabClick(idx)}
                                type="button"
                            >
                                {label}
                            </button>
                        ))}
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
                                <th className="w-24 px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">24년 입결</th>
                                <th className="w-20 px-4 py-3 text-left text-sm font-semibold text-gray-700">판정</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {displayUniversityList.length === 0 ? (
                                <tr>
                                    <td colSpan={10} className="px-6 py-16 text-center border-b border-gray-200">
                                        <div className="flex flex-col items-center space-y-3">
                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-500 font-medium">추천 대학이 없습니다</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                displayUniversityList.map((u, index) => (
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