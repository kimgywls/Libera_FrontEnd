export interface Score {
    id: number;
    student_id: number;
    grade: number;
    semester: number;
    curriculum: string;
    subject: string;
    subject_type: string;
    raw_score: number | null;
    subject_average: number | null;
    standard_deviation?: number;
    achievement_level?: string;
    student_count?: string | null;
    grade_rank?: string | null;
    achievement_distribution?: AchievementDistribution | null;
    credit_hours?: number;
    notes?: string | null;
    created_at?: string;
    updated_at?: string;
}

export interface ScoreForm {
    grade: number;
    semester: number;
    subject_type: string | null;
    curriculum: string;
    subject: string;
    raw_score: number | null;
    subject_average: number | null;
    standard_deviation?: number | null;
    achievement_level?: string | null;
    student_count?: string | null;
    grade_rank?: string | null;
    achievement_distribution?: AchievementDistribution | null;
    credit_hours?: number | null;
    notes?: string | null;
}

export interface ScoresResponse {
    student_id: number;
    scores: Score[];
    total_count: number;
}

export interface AchievementDistribution {
    [key: string]: number;
}

export interface CreateScoreRequest {
    grade: number;
    semester: number;
    subject_type: string | null;
    curriculum: string;
    subject: string;
    raw_score: number | null;
    subject_average: number | null;
    standard_deviation?: number | null;
    achievement_level?: string | null;
    student_count?: string | null;
    grade_rank?: string | null;
    achievement_distribution?: AchievementDistribution | null;
    credit_hours?: number | null;
    notes?: string | null;
    student_id: number;
} 