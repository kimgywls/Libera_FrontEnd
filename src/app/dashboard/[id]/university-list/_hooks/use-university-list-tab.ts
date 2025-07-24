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

export function useUniversityListTab(data: SchoolRecommendationResponse | null): UseUniversityListTabResult {
    const [selectedTab, setSelectedTab] = useState(0);
    const handleTabClick = useCallback((idx: number) => setSelectedTab(idx), []);
    const displayDepartments = useMemo(() => data?.departments || [], [data]);
    const displayTabLabels = useMemo(
        () => ['전체보기', ...displayDepartments.map((dept) => dept.department_name)],
        [displayDepartments]
    );
    const displayUniversityList: UniversityItem[] = useMemo(() => {
        if (selectedTab === 0) {
            return displayDepartments.flatMap((dept) => [
                ...dept.challenge,
                ...dept.suitable,
                ...dept.safe,
            ]) as UniversityItem[];
        } else {
            const dept = displayDepartments[selectedTab - 1];
            if (!dept) return [];
            return [
                ...dept.challenge,
                ...dept.suitable,
                ...dept.safe,
            ] as UniversityItem[];
        }
    }, [displayDepartments, selectedTab]);
    return {
        selectedTab,
        setSelectedTab,
        handleTabClick,
        displayTabLabels,
        displayDepartments,
        displayUniversityList,
    };
} 