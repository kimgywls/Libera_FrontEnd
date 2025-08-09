import { FC, memo } from 'react';
import { CircleCheck, EyeOff, Filter, RefreshCcw } from 'lucide-react';

interface UniversityTableActionsProps {
    hasActiveFilters: boolean;
    regionCount: number;
    typeCount: number;
    categoryCount: number;
    handleResetFilters: () => void;
    onHide: () => Promise<void>;
    onSaveSelectedSchools: () => Promise<void>;
    selectedItemsCount: number;
    isSaving: boolean;
}

const UniversityTableActions: FC<UniversityTableActionsProps> = ({
    hasActiveFilters,
    regionCount,
    typeCount,
    categoryCount,
    handleResetFilters,
    onHide,
    onSaveSelectedSchools,
    selectedItemsCount,
    isSaving
}) => (
    <div className="flex items-center justify-end gap-2">
        {/* 활성 필터 표시 */}
        {hasActiveFilters && (
            <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 px-3 py-1.5 bg-violet-100 text-violet-700 rounded-full text-sm font-medium whitespace-nowrap">
                    <Filter className="w-3 h-3" />
                    <span>활성 필터 {regionCount + typeCount + categoryCount}</span>
                </div>
            </div>
        )}
        <button
            onClick={handleResetFilters}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-slate-500 text-white rounded-lg transition-all duration-200 transform hover:scale-105 group whitespace-nowrap"
        >
            <RefreshCcw className="w-4 h-4 transition-transform duration-300" />
            초기화
        </button>
        <button
            onClick={async () => await onHide()}
            disabled={selectedItemsCount === 0}
            className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all duration-200 transform hover:scale-105 group whitespace-nowrap ${selectedItemsCount === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
        >
            <EyeOff className="w-4 h-4 transition-transform duration-300 " />
            숨김
        </button>
        <button
            onClick={async () => await onSaveSelectedSchools()}
            disabled={selectedItemsCount === 0 || isSaving}
            className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all duration-200 transform hover:scale-105 group whitespace-nowrap ${selectedItemsCount === 0 || isSaving
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-violet-500 text-white hover:bg-violet-600'
                }`}
        >
            <CircleCheck className="w-4 h-4 transition-transform duration-300" />
            {isSaving ? '저장 중...' : `선택한 학교 저장`}
        </button>
    </div>
);

export default memo(UniversityTableActions); 