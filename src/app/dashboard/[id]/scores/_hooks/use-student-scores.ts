import { useQuery } from '@tanstack/react-query';

import { ScoresResponse } from '@/app/types/score';

import { fetchStudentScores } from '../_actions/fetch-student-scores';

export function useStudentScores(studentId: number) {
    const {
        data,
        isLoading,
        isError,
        refetch
    } = useQuery<ScoresResponse>({
        queryKey: ['student-scores', studentId],
        queryFn: () => fetchStudentScores(studentId),
        enabled: !!studentId,
        staleTime: 0, // 데이터를 항상 stale로 간주하여 즉시 업데이트
        gcTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
        refetchOnWindowFocus: true, // 창이 포커스될 때 리페치
        refetchOnMount: true, // 컴포넌트가 마운트될 때 리페치
        refetchOnReconnect: true, // 네트워크 재연결 시 리페치
    });
    return { scores: data, isLoading, isError, refetch };
} 