import { DesiredSchool } from "./university";

// 기본 학생 정보
export interface Student {
    id: number;
    name: string;
    phone_number: string;
    current_school_name: string;
    desired_school: string;
    desired_department: string;
    completion_status: '완료' | '성적만 완료' | '출결만 완료' | '미완료';
    result_file?: string;
}

// 학생 상세 정보
export interface StudentDetail {
    id: number;
    name: string;
    birth_date: string;
    phone_number: string;
    current_school_name: string;
    school_histories: SchoolHistory[];
}

// 학교 이력
export interface SchoolHistory {
    school_name: string;
}

// 학생 정보 (대시보드용)
export interface StudentInfo {
    id: number;
    name: string;
    current_school_name: string;
    desired_school: DesiredSchool[];
    desired_department: DesiredSchool[];
    consultation_date?: Date | null;
    overall_score?: number | null;
    main_subjects_score?: number | null;
}

// 학생 목록 관련 타입
export interface StudentsListParams {
    name?: string;
    phone_number?: string;
    birth_date?: string;
    school?: string;
    limit?: number;
    offset?: number;
}

export interface StudentsListResponse {
    success: boolean;
    total: number;
    students: Student[];
}

// 학생 삭제 관련 타입
export interface DeleteStudentRequest {
    studentIds: number[];
}

export interface DeleteStudentResponse {
    success: boolean;
    message: string;
}

// 성적 확인 관련 타입
export interface ThirdGradeScoresData {
    hasThirdGradeScores: boolean;
}