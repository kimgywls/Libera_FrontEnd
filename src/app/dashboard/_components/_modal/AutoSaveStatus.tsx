import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface AutoSaveStatusProps {
    isAutoSaving: boolean;
    lastSaved: Date | null;
}

const AutoSaveStatus: FC<AutoSaveStatusProps> = ({ isAutoSaving, lastSaved }) => {
    const [timeUntilSave, setTimeUntilSave] = useState(5);
    const [hasError, setHasError] = useState(false);

    // 자동 저장 실패 감지 (5초 후에도 저장되지 않으면 에러로 간주)
    useEffect(() => {
        if (isAutoSaving) {
            setHasError(false);
            const timer = setTimeout(() => {
                setHasError(true);
            }, 10000); // 10초 후 에러로 간주

            return () => clearTimeout(timer);
        }
    }, [isAutoSaving]);

    // 저장 성공 시 에러 상태 초기화
    useEffect(() => {
        if (lastSaved) {
            setHasError(false);
        }
    }, [lastSaved]);

    // 5초 카운트다운
    useEffect(() => {
        if (!isAutoSaving && !lastSaved) {
            const interval = setInterval(() => {
                setTimeUntilSave(prev => {
                    if (prev <= 1) {
                        return 5;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isAutoSaving, lastSaved]);

    if (isAutoSaving) {
        return (
            <div className="flex items-center text-blue-600 text-sm">
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                자동 저장 중...
            </div>
        );
    }

    if (hasError) {
        return (
            <div className="flex items-center text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-2" />
                저장 실패
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
            {timeUntilSave}초 후 자동 저장
        </div>
    );
};

export default AutoSaveStatus; 