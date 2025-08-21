// 공통으로 사용되는 기본 타입들

// 기본 엔티티 인터페이스
export interface BaseEntity {
    id: number;
    created_at: string;
    updated_at: string;
}

// 학생 관련 기본 인터페이스
export interface StudentBase {
    student_id: number;
}

// 학생 엔티티 (BaseEntity + StudentBase)
export interface StudentEntity extends BaseEntity, StudentBase { }

// 학년/학기 관련 인터페이스
export interface GradeSemester {
    grade: number;
    semester: number;
}

// API 응답 기본 패턴
export interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
}

// 페이지네이션 응답 패턴
export interface PaginatedResponse<T> {
    total: number;
    items: T[];
    has_data?: boolean;
}

// 목록 조회 파라미터
export interface ListParams {
    limit?: number;
    offset?: number;
}

// 학생 목록 조회 파라미터
export interface StudentListParams extends ListParams {
    name?: string;
    phone_number?: string;
    birth_date?: string;
    school?: string;
}

// 삭제 요청/응답 패턴
export interface DeleteRequest {
    ids: number[];
}

export interface DeleteResponse {
    success: boolean;
    message: string;
}

// 상태 관련 타입
export type CompletionStatus = '완료' | '성적만 완료' | '출결만 완료' | '미완료';
export type RecommendationStatus = 'active' | 'archived' | 'deleted' | null;

// 점수 관련 공통 타입
export interface ScoreBase {
    raw_score: number | null;
    subject_average: number | null;
    standard_deviation?: number | null;
    achievement_level?: string | null;
    student_count?: string | null;
    grade_rank?: string | null;
    credit_hours?: number | null;
    notes?: string | null;
}

// 출결 관련 공통 타입
export interface AttendanceBase {
    total_days: number;
    absence_disease: number;
    absence_unexcused: number;
    absence_etc: number;
    tardiness_disease: number;
    tardiness_unexcused: number;
    tardiness_etc: number;
    early_leave_disease: number;
    early_leave_unexcused: number;
    early_leave_etc: number;
    result_disease: number;
    result_unexcused: number;
    result_etc: number;
    special_notes: string | null;
}
