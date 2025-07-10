import { useMemo } from 'react';

export function useFilteredUniversityList(
    displayUniversityList: any[],
    searchText: string,
    searchField: string,
    selectedRegions: string[],
    selectedTypes: string[]
) {
    return useMemo(() => {
        return displayUniversityList.filter(u => {
            // 검색
            const search = searchText.trim().toLowerCase();
            let matchesSearch = true;
            if (search) {
                if ([
                    'university_name',
                    'admission_type',
                    'major_name',
                ].includes(searchField)) {
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
} 