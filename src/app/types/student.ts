import { BaseEntity, DeleteRequest, DeleteResponse, CompletionStatus } from './common';
import { DesiredSchool } from './university';

// 학생 기본 정보
export interface Student extends BaseEntity {
    name: string;
    birth_date: Date;
    phone_number: string;
    current_school_name: string;
    desired_school: string;
    desired_department: string;
    completion_status: CompletionStatus;
    result_file?: string;
}

// 학생 상세 정보 (기본 정보 + 추가 필드)
export interface StudentDetail extends Student {
    school_histories: SchoolHistory[];
    consultation_date: Date | null;
}

// 학생 대시보드 정보 (상세 정보 + 점수 정보)
export interface StudentInfo extends Omit<StudentDetail, 'desired_school' | 'desired_department'> {
    desired_school: DesiredSchool[];
    desired_department: DesiredSchool[];
    overall_score?: number | null;
    main_subjects_score?: number | null;
}

// 학교 이력
export interface SchoolHistory {
    school_name: string;
}

// 학생 목록 응답
export interface StudentsListResponse {
    success: boolean;
    total: number;
    students: Student[];
}

// 성적 확인 관련 타입
export interface ThirdGradeScoresData {
    hasThirdGradeScores: boolean;
}

// 학생 관련 API 요청/응답 타입들
export type DeleteStudentRequest = DeleteRequest;
export type DeleteStudentResponse = DeleteResponse;