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

export interface StudentsListResponse {
    success: boolean;
    total: number;
    students: Student[];
}

export interface StudentsListParams {
    name?: string;
    phone_number?: string;
    birth_date?: string;
    school?: string;
    limit?: number;
    offset?: number;
}

export interface StudentInfo {
    name: string;
    current_school_name: string;
    desired_school: string;
    desired_department: string;
    consultation_date: Date;
    overall_score: number;
    main_subjects_score: number;
}