import { BaseEntity, StudentBase } from './common';

// 대학 및 추천 관련 타입

// 기본 대학 정보
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

// 대학 목록용 간소화된 타입
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

// 학과별 추천 정보
export interface DepartmentRecommendation {
    department_name: string;
    priority: number;
    challenge: UniversityInfo[];
    suitable: UniversityInfo[];
    safe: UniversityInfo[];
}

// 학교 추천 응답
export interface SchoolRecommendationResponse {
    student_id: number;
    student_name: string;
    student_grade: number;
    departments: DepartmentRecommendation[];
}

// 희망 학교 정보
export interface DesiredSchool extends BaseEntity, StudentBase {
    school_name: string;
    department_name: string;
    priority: number;
}

// 추천 저장용 아이템
export interface SaveRecommendationItem {
    admission_id: number;
    rank: number;
    suitability_type: string;
    non_subject_suitability: string;
    overall_evaluation: string;
    note: string;
    is_final_choice: boolean;
}

// 추천 저장 요청
export interface SaveRecommendationRequest {
    student_id: number;
    title: string;
    criteria: Record<string, string>;
    note: string;
    items: SaveRecommendationItem[];
}

// 저장된 대학 정보 (기본 대학 정보 + 추가 필드)
export interface SavedUniversityItem extends UniversityInfo, BaseEntity {
    rank: number;
    previous_year_recruitment_count: string;
    element1_name: string;
    element1_percentage: number;
    element2_name: string;
    element2_percentage: number;
    element3_name: string;
    element3_percentage: number;
    element1_score: number;
    element2_score: number;
    element3_score: number;
    total_element_score: number;
    target_year: number;
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
    suitability_type: string;
    subject_suitability: string;
    non_subject_suitability: string;
    overall_evaluation: string;
    note: string;
    is_final_choice: boolean;
}

// 저장된 추천 정보
export interface SavedRecommendation extends BaseEntity, StudentBase {
    student_name: string;
    title: string;
    status: string;
    criteria: Record<string, string>;
    note: string;
    items: SavedUniversityItem[];
}

// 추천 조회 파라미터
export interface GetRecommendationsParams {
    student_id: number;
    rec_status?: 'active' | 'archived' | 'deleted' | null;
}

// 추천 아이템 추가 요청
export interface AddRecommendationItemRequest {
    admission_id: number;
    rank: number;
    suitability_type?: string;
    non_subject_suitability?: string;
    overall_evaluation?: string;
    note?: string;
    is_final_choice?: boolean;
}

// API 응답 타입들
export type GetRecommendationsResponse = SavedRecommendation[];
export type SaveRecommendationResponse = SavedRecommendation;