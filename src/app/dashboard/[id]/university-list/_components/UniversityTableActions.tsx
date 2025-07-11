import { FC, memo } from 'react';
import { EyeOff, Filter, RefreshCcw } from 'lucide-react';

interface UniversityTableActionsProps {
    hasActiveFilters: boolean;
    regionCount: number;
    typeCount: number;
    handleResetFilters: () => void;
    onHide: () => void;
}

const UniversityTableActions: FC<UniversityTableActionsProps> = ({
    hasActiveFilters,
    regionCount,
    typeCount,
    handleResetFilters,
    onHide
}) => (
    <div className="flex items-center justify-end gap-2">
        {/* 활성 필터 표시 */}
        {hasActiveFilters && (
            <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 px-3 py-1.5 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                    <Filter className="w-3 h-3" />
                    <span>활성 필터 {regionCount + typeCount}</span>
                </div>
            </div>
        )}
        <button
            onClick={handleResetFilters}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-slate-500 text-white rounded-lg transition-all duration-200 transform hover:scale-105 group"
        >
            <RefreshCcw className="w-4 h-4 transition-transform duration-300" />
            초기화
        </button>
        <button
            onClick={onHide}
            className="flex items-center gap-2 bg-blue-500 text-white px-3 py-2 text-sm rounded-lg transition-all duration-200 transform hover:scale-105 group"
        >
            <EyeOff className="w-4 h-4 transition-transform duration-300 " />
            숨김
        </button>
    </div>
);

export default memo(UniversityTableActions); 