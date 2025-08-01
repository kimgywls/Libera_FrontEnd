// 대학 및 추천 관련 타입

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

export type UniversityItem = Pick<UniversityInfo,
    'admission_id' |
    'university_name' |
    'admission_category' |
    'admission_type' |
    'major_name' |
    'admission_method' |
    'recruitment_count' |
    'grade_cutoff_current' |
    'grade_cutoff_prev1' |
    'region' |
    'recommendation_type' |
    'is_hidden'
>;

export interface DepartmentRecommendation {
    department_name: string;
    priority: number;
    challenge: UniversityInfo[];
    suitable: UniversityInfo[];
    safe: UniversityInfo[];
}

export interface SchoolRecommendationResponse {
    student_id: number;
    student_name: string;
    student_grade: number;
    departments: DepartmentRecommendation[];
}

export interface DesiredSchool {
    school_name: string;
    department_name: string;
    priority: number;
    id: number;
    student_id: number;
}

export interface SaveRecommendationItem {
    admission_id: number;
    rank: number;
    suitability_type: string;
    non_subject_suitability: string;
    overall_evaluation: string;
    note: string;
    is_final_choice: boolean;
}

export interface SaveRecommendationRequest {
    student_id: number;
    title: string;
    criteria: Record<string, any>;
    note: string;
    items: SaveRecommendationItem[];
}

export interface SavedUniversityItem extends UniversityInfo {
    id: number;
    rank: number;
    competition_ratio_cy: string;
    grade_cutoff_cy: string;
    add_recruit_cy: string;
    competition_ratio_cy_minus_1: string;
    grade_cutoff_cy_minus_1: string;
    add_recruit_cy_minus_1: string;
    competition_ratio_cy_minus_2: string;
    grade_cutoff_cy_minus_2: string;
    add_recruit_cy_minus_2: string;
    minimum_qualification: string;
    university_exam_date: string;
    subject_suitability: string;
    non_subject_suitability: string;
    overall_evaluation: string;
    is_final_choice: boolean;
    created_at: string;
    updated_at: string;
}

export interface SaveRecommendationResponse {
    id: number;
    student_id: number;
    student_name: string;
    title: string;
    status: string;
    criteria: Record<string, any>;
    note: string;
    items: SavedUniversityItem[];
    created_at: string;
    updated_at: string;
}

// 저장된 추천 학교 조회 관련 타입
export interface GetRecommendationsParams {
    student_id: number;
    rec_status?: 'active' | 'archived' | 'deleted' | null;
}

export interface SavedRecommendationItem {
    id: number;
    rank: number;
    admission_id: number;
    university_name: string;
    major_name: string;
    admission_category: string;
    admission_type: string;
    recruitment_count: string;
    competition_ratio_cy: string;
    grade_cutoff_cy: string;
    add_recruit_cy: string;
    competition_ratio_cy_minus_1: string;
    grade_cutoff_cy_minus_1: string;
    add_recruit_cy_minus_1: string;
    competition_ratio_cy_minus_2: string;
    grade_cutoff_cy_minus_2: string;
    add_recruit_cy_minus_2: string;
    admission_method: string;
    minimum_qualification: string;
    university_exam_date: string;
    suitability_type: string;
    subject_suitability: string;
    non_subject_suitability: string;
    overall_evaluation: string;
    note: string;
    is_final_choice: boolean;
    is_hidden: boolean;
    created_at: string;
    updated_at: string;
}

export interface SavedRecommendation {
    id: number;
    student_id: number;
    student_name: string;
    title: string;
    status: string;
    criteria: Record<string, any>;
    note: string;
    items: SavedRecommendationItem[];
    created_at: string;
    updated_at: string;
}

export type GetRecommendationsResponse = SavedRecommendation[];

export interface AddRecommendationItemRequest {
    admission_id: number;
    rank: number;
    suitability_type?: string;
    non_subject_suitability?: string;
    overall_evaluation?: string;
    note?: string;
    is_final_choice?: boolean;
}