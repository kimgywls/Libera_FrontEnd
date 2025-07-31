import { useState, useCallback, useMemo } from 'react';

import type { SchoolRecommendationResponse, UniversityItem } from '@/app/types/university';

interface UseUniversityListTabResult {
    selectedTab: number;
    setSelectedTab: (idx: number) => void;
    handleTabClick: (idx: number) => void;
    displayTabLabels: string[];
    displayDepartments: SchoolRecommendationResponse['departments'];
    displayUniversityList: UniversityItem[];
}

export function useUniversityListTab(
    data: SchoolRecommendationResponse | null,
    hiddenList: UniversityItem[] = [] // 숨긴 학교 목록 추가
): UseUniversityListTabResult {
    const [selectedTab, setSelectedTab] = useState(0);
    const handleTabClick = useCallback((idx: number) => setSelectedTab(idx), []);
    const displayDepartments = useMemo(() => data?.departments || [], [data]);
    
    // 전체학과를 제외한 학과들
    const nonAllDepartments = useMemo(() => 
        displayDepartments.filter(dept => dept.department_name !== '성적기반추천'), 
        [displayDepartments]
    );
    
    const displayTabLabels = useMemo(
        () => ['전체보기', ...displayDepartments.map((dept) => dept.department_name)],
        [displayDepartments]
    );
    
    const displayUniversityList: UniversityItem[] = useMemo(() => {
        let allUniversities: UniversityItem[] = [];
        
        if (selectedTab === 0) {
            // 전체보기에서는 전체학과를 제외한 학과들만 표시
            allUniversities = nonAllDepartments.flatMap((dept) => [
                ...dept.challenge,
                ...dept.suitable,
                ...dept.safe,
            ]) as UniversityItem[];
        } else {
            const dept = displayDepartments[selectedTab - 1];
            if (!dept) return [];
            allUniversities = [
                ...dept.challenge,
                ...dept.suitable,
                ...dept.safe,
            ] as UniversityItem[];
        }
        
        // 숨긴 학교 제외
        const hiddenIds = new Set(hiddenList.map(h => h.admission_id));
        return allUniversities.filter(u => !hiddenIds.has(u.admission_id));
    }, [displayDepartments, nonAllDepartments, selectedTab, hiddenList]);
    
    return {
        selectedTab,
        setSelectedTab,
        handleTabClick,
        displayTabLabels,
        displayDepartments,
        displayUniversityList,
    };
} 