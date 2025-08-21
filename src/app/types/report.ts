import { Score } from './score';
import { SemesterTrendResponse } from './semesterTrend';
import { ChecklistQuestion, ChecklistResponseItem, ChecklistResultScores, ChecklistDetailedResultResponse } from './checklist';
import { StudentInfo } from './student';
import { Attendance } from './attendance';
import { SavedRecommendation } from './university';
import { FinalEvaluationResponse, OverallEvaluationResponse } from './comprehensiveEvaluation';

export interface StudentReportData {
    studentInfo: StudentInfo;
    attendance: Attendance[];
    scores: Score[];
    semesterTrend?: SemesterTrendResponse;
    overallGpa: number;
    checklistQuestions: ChecklistQuestion[];
    checklistResponses: ChecklistResponseItem[];
    checklistResult: ChecklistResultScores;
    checklistDetailedResult?: ChecklistDetailedResultResponse;
    recommendedUniversities: SavedRecommendation[];
    finalEvaluation: FinalEvaluationResponse | null;
    overallEvaluation: OverallEvaluationResponse | null;
}

export interface ReportSection {
    title: string;
    content: React.ReactNode;
} 