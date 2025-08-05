import { useMemo } from 'react';
import { useStudentInfoContext } from '@/app/contexts/StudentInfoContext';
import { useAttendance } from '../../scores/_hooks/use-attendance';
import { useStudentScores } from '../../scores/_hooks/use-student-scores';
import { useSemesterTrend } from '../../scores/_hooks/use-semester-trend';
import { useOverallGpa } from '../../scores/_hooks/use-overall-gpa';
import { useChecklistQuestions } from '../../checklist/_hooks/use-checklist-questions';
import { useChecklistResponses } from '../../checklist/_hooks/use-checklist-responses';
import { useChecklistResult } from '../../checklist/_hooks/use-checklist-result';
import { StudentReportData } from '@/app/types/report';
import { useSavedRecommendations } from '../../comprehensive-evaluation/_hooks/use-saved-recommendations';

export const useReportData = (studentId: number) => {
    const { studentInfo } = useStudentInfoContext();
    const { scores } = useStudentScores(studentId);
    const { semesterTrend } = useSemesterTrend(studentId);
    const { overallGpa } = useOverallGpa(studentId);
    const { data: questionsData } = useChecklistQuestions();
    const { data: responsesData } = useChecklistResponses(studentId);
    const { data: resultData } = useChecklistResult(studentId);
    const { attendance } = useAttendance(studentId);
    const { data: recommendedUniversities } = useSavedRecommendations({ student_id: studentId, rec_status: 'active' });
    const reportData: StudentReportData | null = useMemo(() => {
        if (!studentInfo || !scores || !questionsData) {
            return null;
        }

        return {
            studentInfo: studentInfo,
            attendance: attendance?.records || [],
            scores: scores.scores || [],
            semesterTrend: semesterTrend || undefined,
            checklistQuestions: questionsData.questions || [],
            checklistResponses: responsesData?.responses || [],
            checklistResult: resultData?.result_scores || {
                "학업역량": 0,
                "진로역량": 0,
                "공동체역량": 0,
                total: 0,
            },
            overallGpa: overallGpa || 0,
            recommendedUniversities: recommendedUniversities || [],
        };
    }, [studentInfo, scores, semesterTrend, overallGpa, questionsData, responsesData, attendance, resultData, recommendedUniversities]);

    return { reportData };
}; 