export interface SemesterTrendPeriod {
    period: string;
    grade: number;
    semester: number;
    gpa: number;
    score_count: number;
}

export interface SemesterTrendCategory {
    id: string;
    name: string;
    description: string;
    periods: SemesterTrendPeriod[];
}

export interface SemesterTrendResponse {
    student_id: number;
    categories: SemesterTrendCategory[];
} 