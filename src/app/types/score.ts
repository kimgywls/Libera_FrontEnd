import { BaseEntity, StudentBase, GradeSemester, ScoreBase } from './common';

export interface Score extends BaseEntity, StudentBase, GradeSemester, ScoreBase {
    curriculum: string;
    subject: string;
    subject_type: string;
    achievement_distribution?: AchievementDistribution | null;
}

export interface ScoreForm extends GradeSemester, ScoreBase {
    id?: number;
    subject_type: string | null;
    curriculum: string;
    subject: string;
    achievement_distribution?: AchievementDistribution | string | null;
}

export interface ScoresResponse {
    student_id: number;
    scores: Score[];
    total_count: number;
}

export interface AchievementDistribution {
    [key: string]: number;
}

export interface CreateScoreRequest extends GradeSemester, ScoreBase {
    subject_type: string | null;
    curriculum: string;
    subject: string;
    achievement_distribution?: AchievementDistribution | null;
    student_id: number;
} 