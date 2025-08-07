import { useMemo } from 'react';
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