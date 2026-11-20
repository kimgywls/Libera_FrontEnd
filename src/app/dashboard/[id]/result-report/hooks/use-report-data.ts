import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { useQueryClient, type QueryKey } from '@tanstack/react-query';
import { useStudentInfoContext } from '@/app/contexts/StudentInfoContext';
import { useAttendance } from '../../scores/_hooks/use-attendance';
import { useStudentScores } from '../../scores/_hooks/use-student-scores';
import { useSemesterTrend } from '../../scores/_hooks/use-semester-trend';
import { useChecklistQuestions } from '../../checklist/_hooks/use-checklist-questions';
import { useChecklistResponses } from '../../checklist/_hooks/use-checklist-responses';
import { useChecklistResult } from '../../checklist/_hooks/use-checklist-result';
import { StudentReportData } from '@/app/types/report';
import { useSavedRecommendations } from '../../comprehensive-evaluation/_hooks/use-saved-recommendations';
import { useFinalEvaluation } from '../../comprehensive-evaluation/_hooks/use-final-evaluation';
import { useOverallEvaluation } from '../../comprehensive-evaluation/_hooks/use-overall-evaluation';
import { useOverallGpa } from '../../scores/_hooks/use-overall-gpa';
import { useChecklistDetailedResult } from '../../checklist/_hooks/use-checklist-detailed-result';

export const useReportData = (studentId: number) => {
    const { studentInfo } = useStudentInfoContext();
    const { attendance } = useAttendance(studentId);
    const { scores } = useStudentScores(studentId);
    const { semesterTrend } = useSemesterTrend(studentId);
    const { overallGpa } = useOverallGpa(studentId);
    const { data: questionsData } = useChecklistQuestions();
    const { data: responsesData } = useChecklistResponses(studentId);
    const { data: resultData } = useChecklistResult(studentId);
    const { data: detailedResult } = useChecklistDetailedResult(studentId);
    const { data: recommendedUniversities } = useSavedRecommendations({ student_id: studentId, rec_status: 'active' });
    const { data: finalEvaluation } = useFinalEvaluation(studentId);
    const { data: overallEvaluation } = useOverallEvaluation(studentId);

    const reportData: StudentReportData | null = useMemo(() => {
        if (!studentInfo || !scores || !questionsData) {
            return null;
        }

        return {
            studentInfo: studentInfo,
            attendance: attendance?.records || [],
            scores: scores.scores || [],
            semesterTrend: semesterTrend || undefined,
            overallGpa: overallGpa || 0,
            checklistQuestions: questionsData.questions || [],
            checklistResponses: responsesData?.responses || [],
            checklistResult: resultData?.result_scores || {
                "학업역량": 0,
                "진로역량": 0,
                "공동체역량": 0,
                total: 0,
            },
            checklistDetailedResult: detailedResult || undefined,
            recommendedUniversities: recommendedUniversities || [],
            finalEvaluation: finalEvaluation || null,
            overallEvaluation: overallEvaluation || null,
        };
    }, [studentInfo, scores, semesterTrend, overallGpa, questionsData, responsesData, detailedResult, attendance, resultData, recommendedUniversities, finalEvaluation, overallEvaluation]);

    return { reportData };
};

// 리포트가 쓰는 쿼리 목록. queryKey 는 각 훅(StudentInfoContext 포함)에 정의된 키와 같아야 한다.
// 학생 ID가 있으면 13개 모두 필수다. 학생별 쿼리는 enabled: !!studentId 조건이며,
// checklistQuestions 만 학생과 무관하게 항상 실행된다.
export const getReportQueries = (studentId: number): { name: string; label: string; queryKey: QueryKey }[] => [
    { name: 'student-detail', label: '학생 정보', queryKey: ['student-detail', studentId] },
    { name: 'desired-schools', label: '진학 목표', queryKey: ['desired-schools', studentId] },
    { name: 'overall-gpa', label: '내신 성적', queryKey: ['overall-gpa', studentId] },
    { name: 'attendance', label: '출결', queryKey: ['attendance', studentId] },
    { name: 'student-scores', label: '학기별 성적', queryKey: ['student-scores', studentId] },
    { name: 'semester-trend', label: '석차등급 추이', queryKey: ['semester-trend', studentId] },
    { name: 'checklist-questions', label: '체크리스트 문항', queryKey: ['checklistQuestions'] },
    { name: 'checklist-responses', label: '체크리스트 응답', queryKey: ['checklist-responses', studentId] },
    { name: 'checklist-result', label: '체크리스트 점수', queryKey: ['checklist-result', studentId] },
    { name: 'checklist-detailed-result', label: '평가요소별 점수', queryKey: ['checklist-detailed-result', studentId] },
    { name: 'saved-recommendations', label: '추천 대학', queryKey: ['saved-recommendations', studentId, 'active'] },
    { name: 'final-evaluation', label: '학생부 종합 의견', queryKey: ['final-evaluation', studentId] },
    { name: 'overall-evaluation', label: '최종 의견', queryKey: ['overall-evaluation', studentId] },
];

export type ReportReadiness = 'loading' | 'error' | 'ready';

/**
 * 리포트 쿼리들의 캐시 상태만 구독해 인쇄 가능 여부를 판단한다.
 * - 쿼리 옵저버를 새로 만들지 않으므로 이 훅 때문에 요청이 늘지 않는다.
 * - status 기준이라 빈 배열·null 같은 정상 응답은 'success' 로, 아직 시작 전·로딩 중은 'pending' 으로 구분된다.
 * - 키에 studentId 가 들어 있어 다른 학생의 캐시는 준비 완료로 보지 않는다.
 */
export const useReportReadiness = (studentId: number) => {
    const queryClient = useQueryClient();
    const queries = useMemo(() => getReportQueries(studentId), [studentId]);

    const subscribe = useCallback(
        (onChange: () => void) => queryClient.getQueryCache().subscribe(onChange),
        [queryClient]
    );
    // 문자열 스냅샷: 상태가 같으면 같은 값이 되어 불필요한 렌더링이 없다
    const snapshot = useSyncExternalStore(
        subscribe,
        () => queries.map(({ queryKey }) => {
            const state = queryClient.getQueryState(queryKey);
            return `${state?.status ?? 'pending'}:${state?.fetchStatus ?? 'idle'}`;
        }).join('|'),
        () => ''
    );

    const states = snapshot ? snapshot.split('|').map((s) => s.split(':')) : [];
    const failed = queries.filter((_, i) => states[i]?.[0] === 'error');
    const pendingCount = queries.filter((_, i) => states[i]?.[0] !== 'success').length;
    const isRetrying = failed.some((q) => states[queries.indexOf(q)]?.[1] === 'fetching');

    const readiness: ReportReadiness = !studentId || !snapshot
        ? 'loading'
        : failed.length > 0 ? 'error' : pendingCount > 0 ? 'loading' : 'ready';

    const retry = useCallback(() => {
        failed.forEach(({ queryKey }) => queryClient.refetchQueries({ queryKey, exact: true }));
    }, [failed, queryClient]);

    return {
        readiness,
        total: queries.length,
        readyCount: queries.length - pendingCount,
        failedLabels: failed.map((q) => q.label),
        isRetrying,
        retry,
    };
}; 