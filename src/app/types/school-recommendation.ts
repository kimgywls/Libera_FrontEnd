export interface SchoolRecommendationResponse {
    student_id: number;
    student_name: string;
    student_grade: number;
    departments: DepartmentRecommendation[];
}

export interface DepartmentRecommendation {
    department_name: string;
    priority: number;
    challenge: UniversityInfo[];
    suitable: UniversityInfo[];
    safe: UniversityInfo[];
}

export interface UniversityInfo {
    admission_id: number;
    university_name: string;
    major_name: string;
    region: string;
    admission_category: string;
    admission_type: string;
    admission_method: string;
    recruitment_count: string;
    grade_cutoff_current: string;
    grade_cutoff_prev1: string;
    grade_cutoff_prev2: string | null;
    recommendation_type: string;
    student_grade: number;
    cutoff_grade_numeric: number;
    grade_difference: number;
    competition_ratio: string;
    is_desired: boolean;
    is_hidden: boolean;
    university_id?: number;
    university_location?: string;
    university_type?: string;
} 