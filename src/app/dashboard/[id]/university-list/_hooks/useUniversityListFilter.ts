import { useState, useMemo, useCallback } from 'react';

export function useUniversityListFilter(displayUniversityList: any[]) {
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [showRegionFilter, setShowRegionFilter] = useState(false);
    const [showTypeFilter, setShowTypeFilter] = useState(false);
    const clearRegionFilter = useCallback(() => setSelectedRegions([]), []);
    const clearTypeFilter = useCallback(() => setSelectedTypes([]), []);
    const handleResetFilters = useCallback(() => {
        setSelectedRegions([]);
        setSelectedTypes([]);
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
    return {
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
    };
} 