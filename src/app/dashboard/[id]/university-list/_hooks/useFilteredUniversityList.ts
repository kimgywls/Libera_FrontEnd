import { useMemo } from 'react';
import type { UniversityItem } from '@/app/types/university';

const SEARCHABLE_FIELDS: Array<keyof UniversityItem> = [
    'university_name',
    'admission_type',
    'major_name',
];

export function useFilteredUniversityList(
    displayUniversityList: UniversityItem[],
    searchText: string,
    searchField: keyof UniversityItem,
    selectedRegions: string[],
    selectedTypes: string[]
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
            return matchesSearch && matchesRegion && matchesType;
        });
    }, [displayUniversityList, searchText, searchField, selectedRegions, selectedTypes]);
} 