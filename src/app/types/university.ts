export interface UniversityItem {
    admission_id: number;
    university_name: string;
    admission_type: string;
    major_name: string;
    admission_method: string;
    recruitment_count: string;
    grade_cutoff_current: string;
    grade_cutoff_prev1: string;
    region: string;
    recommendation_type: string;
    is_hidden?: boolean;
} 