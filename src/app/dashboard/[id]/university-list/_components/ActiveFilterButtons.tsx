import { FC, memo } from 'react';
import { Filter, RefreshCcw, Send } from 'lucide-react';

interface ActiveFilterButtonsProps {
    hasActiveFilters: boolean;
    regionCount: number;
    typeCount: number;
    handleResetFilters: () => void;
    onSend: () => void;
}

const ActiveFilterButtons: FC<ActiveFilterButtonsProps> = ({
    hasActiveFilters,
    regionCount,
    typeCount,
    handleResetFilters,
    onSend
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
            className="flex items-center gap-2 px-4 py-3 bg-slate-500 text-white rounded-lg transition-all duration-200 transform hover:scale-105 group"
            aria-label="필터 초기화"
            title="모든 필터 초기화"
        >
            <RefreshCcw className="w-4 h-4 transition-transform duration-300" />
            필터 초기화
        </button>
        <button
            onClick={onSend}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 group"
        >
            <Send className="w-4 h-4 transition-transform duration-300 " />
            추천 학교 전송
        </button>
    </div>
);

export default memo(ActiveFilterButtons); 