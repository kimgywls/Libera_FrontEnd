import { useState, useCallback } from 'react';

const searchFields = [
    { value: 'university_name', label: '대학명' },
    { value: 'admission_type', label: '전형명' },
];

export function useUniversityListSearch() {
    const [searchField, setSearchField] = useState('university_name');
    const [searchInput, setSearchInput] = useState('');
    const [searchText, setSearchText] = useState('');
    const handleSearch = useCallback(() => setSearchText(searchInput), [searchInput]);
    const handleInputKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch();
    }, [handleSearch]);
    const handleResetSearchBar = useCallback(() => {
        setSearchInput('');
        setSearchText('');
    }, []);
    return {
        searchFields,
        searchField,
        setSearchField,
        searchInput,
        setSearchInput,
        searchText,
        setSearchText,
        handleSearch,
        handleInputKeyDown,
        handleResetSearchBar,
    };
} 