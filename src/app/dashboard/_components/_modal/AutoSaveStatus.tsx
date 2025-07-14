import type { FC } from 'react';
import { Loader2, CheckCircle2, Clock } from 'lucide-react';

interface AutoSaveStatusProps {
    isAutoSaving: boolean;
    lastSaved: Date | null;
}

const AutoSaveStatus: FC<AutoSaveStatusProps> = ({ isAutoSaving, lastSaved }) => {
    if (isAutoSaving) {
        return (
            <div className="flex items-center text-blue-600 text-sm">
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                자동 저장 중...
            </div>
        );
    }

    if (lastSaved) {
        return (
            <div className="flex items-center text-green-600 text-sm">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {lastSaved.toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit'
                })} 저장됨
            </div>
        );
    }

    return (
        <div className="flex items-center text-gray-500 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            2초 후 자동 저장
        </div>
    );
};

export default AutoSaveStatus; 