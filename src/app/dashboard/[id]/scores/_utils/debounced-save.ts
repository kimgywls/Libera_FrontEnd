import { useCallback, useRef } from 'react';

interface DebouncedSaveProps {
    onSave: () => void;
    delay?: number;
}

/**
 * 디바운스된 저장 기능을 제공하는 커스텀 훅
 * 연속된 수정 시 마지막 수정 후 일정 시간 대기 후 저장
 */
export function DebouncedSave({ onSave, delay = 10000 }: DebouncedSaveProps) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const debouncedSave = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            onSave();
        }, delay);
    }, [onSave, delay]);

    const cancelSave = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    return { debouncedSave, cancelSave };
} 