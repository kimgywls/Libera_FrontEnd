import { useMemo } from 'react';

import type { UniversityItem } from '@/app/types/university';

const SEARCHABLE_FIELDS: Array<keyof UniversityItem> = [
    'university_name',
    'admission_type',
    'admission_category',
    'major_name',
];

export function useFilteredUniversityList(
    displayUniversityList: UniversityItem[],
    searchText: string,
    searchField: keyof UniversityItem,
    selectedRegions: string[],
    selectedTypes: string[],
    selectedCategories: string[]
): UniversityItem[] {
    return useMemo(() => {
        return displayUniversityList.filter(u => {
            const search = searchText.trim().toLowerCase();
            let matchesSearch = true;
            if (search) {
                if (SEARCHABLE_FIELDS.includes(searchField)) {
                    const value = u[searchField];
                    matchesSearch =
                        typeof value === 'string' && value.toLowerCase().includes(search);
                } else {
                    matchesSearch = false;
                }
            }
            const matchesRegion =
                selectedRegions.length === 0 || selectedRegions.includes(u.region);
            const matchesType =
                selectedTypes.length === 0 || selectedTypes.includes(u.recommendation_type);
            const matchesCategory =
                selectedCategories.length === 0 || selectedCategories.includes(u.admission_category);
            return matchesSearch && matchesRegion && matchesType && matchesCategory;
        });
    }, [displayUniversityList, searchText, searchField, selectedRegions, selectedTypes, selectedCategories]);
} 