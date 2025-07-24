import { useState, useMemo, useCallback } from 'react';

import { UniversityItem } from '@/app/types/university';

export function useUniversityListFilter(displayUniversityList: UniversityItem[]) {
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [showRegionFilter, setShowRegionFilter] = useState(false);
    const [showTypeFilter, setShowTypeFilter] = useState(false);
    const [showCategoryFilter, setShowCategoryFilter] = useState(false);
    const clearRegionFilter = useCallback(() => setSelectedRegions([]), []);
    const clearTypeFilter = useCallback(() => setSelectedTypes([]), []);
    const clearCategoryFilter = useCallback(() => setSelectedCategories([]), []);
    const handleResetFilters = useCallback(() => {
        setSelectedRegions([]);
        setSelectedTypes([]);
        setSelectedCategories([]);
    }, []);
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
    const allCategories = useMemo(() => {
        const set = new Set<string>();
        displayUniversityList.forEach(u => {
            if (u.admission_category) set.add(u.admission_category);
        });
        return Array.from(set);
    }, [displayUniversityList]);
    return {
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
    };
} 