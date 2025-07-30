import React, { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';

import { StudentsListParams } from '@/app/types/student';

interface StudentsSearchFormProps {
    value: StudentsListParams;
    onChange: (params: StudentsListParams) => void;
}

export const StudentsSearchForm: React.FC<StudentsSearchFormProps> = React.memo(
    ({ value, onChange }) => {
        const [searchType, setSearchType] = useState<'name' | 'phone_number' | 'current_school_name'>('name');
        const [searchValue, setSearchValue] = useState('');
        const [error, setError] = useState('');

        const handleSearch = useCallback(() => {
            if (!searchValue.trim()) {
                setError('검색어를 입력하세요.');
                return;
            }
            setError('');
            onChange({
                ...value,
                name: searchType === 'name' ? searchValue : undefined,
                phone_number: searchType === 'phone_number' ? searchValue : undefined,
                school: searchType === 'current_school_name' ? searchValue : undefined,
                offset: 0,
            });
        }, [searchType, searchValue, onChange, value]);

        const handleClearButton = useCallback(() => {
            setSearchValue('');
            setError('');
            onChange({
                ...value,
                name: undefined,
                phone_number: undefined,
                school: undefined,
                offset: 0,
            });
        }, [onChange, value]);

        return (
            <div className="w-2/3 min-w-[650px] max-w-[750px] text-gray-800 rounded-md p-2" >
                <div className="px-2">
                    <div className="flex space-x-4 items-end">
                        <select
                            value={searchType}
                            onChange={e => setSearchType(e.target.value as 'name' | 'phone_number' | 'current_school_name')}
                            className="w-32 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500"
                        >
                            <option value="name">이름</option>
                            <option value="phone_number">연락처</option>
                            <option value="current_school_name">고등학교</option>
                        </select>
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder={
                                    searchType === 'name'
                                        ? '학생 이름 입력'
                                        : searchType === 'phone_number'
                                            ? '연락처 입력'
                                            : '고등학교명 입력'
                                }
                                value={searchValue}
                                onChange={e => setSearchValue(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleSearch();
                                    }
                                }}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 pr-10"
                            />
                            {searchValue && (
                                <button
                                    type="button"
                                    onClick={handleClearButton}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                                    aria-label="검색어 지우기"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="px-4 py-2 bg-violet-100 text-violet-700 rounded-md hover:bg-violet-200 transition-colors flex items-center justify-center gap-2"
                        >
                            <Search className="w-4 h-4" />
                            검색
                        </button>
                    </div>
                    {error && <div className="text-sm text-red-500 mt-1">{error}</div>}
                </div>
            </div>
        );
    }
);

StudentsSearchForm.displayName = 'StudentsSearchForm'; 