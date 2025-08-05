import { Score } from './score';
import { SemesterTrendResponse } from './semesterTrend';
import { ChecklistQuestion, ChecklistResponseItem, ChecklistResultScores } from './checklist';
import { StudentInfo } from './student';
import { Attendance } from './attendance';
import { SavedRecommendation } from './university';

export interface StudentReportData {
    studentInfo: StudentInfo;
    attendance: Attendance[];
    scores: Score[];
    semesterTrend?: SemesterTrendResponse;
    checklistQuestions: ChecklistQuestion[];
    checklistResponses: ChecklistResponseItem[];
    checklistResult: ChecklistResultScores;
    overallGpa: number;
    recommendedUniversities: SavedRecommendation[];
}

export interface ReportSection {
    title: string;
    content: React.ReactNode;
} 