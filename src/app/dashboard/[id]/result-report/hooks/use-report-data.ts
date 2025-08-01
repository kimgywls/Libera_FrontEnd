import { useMemo } from 'react';
import { useStudentInfoContext } from '@/app/contexts/StudentInfoContext';
import { useAttendance } from '../../scores/_hooks/use-attendance';
import { useStudentScores } from '../../scores/_hooks/use-student-scores';
import { useSemesterTrend } from '../../scores/_hooks/use-semester-trend';
import { useOverallGpa } from '../../scores/_hooks/use-overall-gpa';
import { useChecklistQuestions } from '../../checklist/_hooks/use-checklist-questions';
import { useChecklistResponses } from '../../checklist/_hooks/use-checklist-responses';
import { StudentReportData } from '@/app/types/report';

export const useReportData = (studentId: number) => {
    const { studentInfo } = useStudentInfoContext();
    const { scores } = useStudentScores(studentId);
    const { semesterTrend } = useSemesterTrend(studentId);
    const { overallGpa } = useOverallGpa(studentId);
    const { data: questionsData } = useChecklistQuestions();
    const { data: responsesData } = useChecklistResponses(studentId);
    const { attendance } = useAttendance(studentId);
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
            overallGpa: overallGpa || 0,
        };
    }, [studentInfo, scores, semesterTrend, overallGpa, questionsData, responsesData, attendance]);

    return { reportData };
}; 