import { Score } from './score';
import { SemesterTrendResponse } from './semesterTrend';
import { ChecklistQuestion, ChecklistResponseItem } from './checklist';
import { StudentInfo } from './student';
import { Attendance } from './attendance';

export interface StudentReportData {
    studentInfo: StudentInfo;
    attendance: Attendance[];
    scores: Score[];
    semesterTrend?: SemesterTrendResponse;
    checklistQuestions: ChecklistQuestion[];
    checklistResponses: ChecklistResponseItem[];
    overallGpa: number;
}

export interface ReportSection {
    title: string;
    content: React.ReactNode;
} 