import { FC, memo } from 'react';
import { Search, X } from 'lucide-react';

export interface SearchBarProps {
    searchFields: { value: string; label: string }[];
    searchField: string;
    setSearchField: (v: string) => void;
    searchInput: string;
    setSearchInput: (v: string) => void;
    handleSearch: () => void;
    handleInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleResetSearchBar: () => void;
}

const SearchBar: FC<SearchBarProps> = ({
    searchFields,
    searchField,
    setSearchField,
    searchInput,
    setSearchInput,
    handleSearch,
    handleInputKeyDown,
    handleResetSearchBar,
}) => {

    return (
        <div className="bg-gray-50 px-6 py-4 mb-2 rounded-lg text-gray-700">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">검색 및 필터</h3>
                        <p className="text-sm text-gray-500">원하는 조건으로 대학을 찾아보세요</p>
                    </div>
                </div>

            </div>


            {/* 검색 영역 */}
            <div className="space-y-4">
                {/* 검색 바 */}
                <div className="flex flex-col lg:flex-row gap-3 ">
                    {/* 검색 필드 선택 */}
                    <div className="lg:w-48">
                        <label className="block text-sm font-medium text-gray-700 mb-2">검색 범위</label>
                        <select
                            className="w-full border border-gray-300 rounded-xl py-3 px-4 text-gray-700 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
                            value={searchField}
                            onChange={e => setSearchField(e.target.value)}
                        >
                            {searchFields.map(field => (
                                <option key={field.value} value={field.value}>{field.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* 검색 입력 */}
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">검색어</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="검색어를 입력하세요..."
                                className="w-full pl-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 shadow-sm transition-all duration-200 hover:shadow-md text-gray-700"
                                value={searchInput}
                                onChange={e => setSearchInput(e.target.value)}
                                onKeyDown={e => {
                                    handleInputKeyDown(e);
                                    if (e.key === 'Enter') handleSearch();
                                }}
                            />
                            <X className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" onClick={handleResetSearchBar} />
                        </div>
                    </div>

                    {/* 액션 버튼들 */}
                    <div className="flex flex-col justify-end">
                        <div className="flex gap-2">
                            <button
                                onClick={handleSearch}
                                className="p-3 rounded-full text-gray-500 hover:text-violet-600 hover:bg-white transition-all duration-200 transform hover:scale-105"
                            >
                                <Search className="w-6 h-6" />
                            </button>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default memo(SearchBar);