import { StudentBase, GradeSemester } from './common';

export interface SemesterTrendPeriod extends GradeSemester {
    period: string;
    gpa: number;
    score_count: number;
}

export interface SemesterTrendCategory {
    id: string;
    name: string;
    description: string;
    periods: SemesterTrendPeriod[];
}

export interface SemesterTrendResponse extends StudentBase {
    categories: SemesterTrendCategory[];
} 