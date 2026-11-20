import { useCallback, useLayoutEffect, useSyncExternalStore } from 'react';

// 리포트 본문이 '모든 데이터가 준비된 상태로 DOM 에 반영되었는지'를 학생별로 알리는 작은 저장소.
// 쿼리 캐시 상태(useReportReadiness)는 본문보다 먼저 갱신될 수 있어서,
// 인쇄 버튼은 이 신호까지 확인한 뒤에 활성화한다.
const renderedStudents = new Set<number>();
const listeners = new Set<() => void>();

const setRendered = (studentId: number, rendered: boolean) => {
    const had = renderedStudents.has(studentId);
    if (had === rendered) return;
    if (rendered) renderedStudents.add(studentId);
    else renderedStudents.delete(studentId);
    listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
};

// 본문 컴포넌트에서 호출: 커밋(DOM 반영) 직후에 상태를 알린다.
export const useMarkReportRendered = (studentId: number, isComplete: boolean) => {
    useLayoutEffect(() => {
        if (!studentId) return;
        setRendered(studentId, isComplete);
        return () => setRendered(studentId, false);
    }, [studentId, isComplete]);
};

// 인쇄 버튼에서 호출
export const useIsReportRendered = (studentId: number) => {
    const getSnapshot = useCallback(() => renderedStudents.has(studentId), [studentId]);
    return useSyncExternalStore(subscribe, getSnapshot, () => false);
};
