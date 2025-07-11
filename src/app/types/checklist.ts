// checklist meta 관련 타입 및 enum
export enum HighschoolTypeEnum {
    일반고 = '일반고',
    자사자공고 = '자사/자공고',
    특수목적고 = '특수목적고',
    기타 = '기타',
}

export interface SaveChecklistMetaRequest {
    highschool_type: HighschoolTypeEnum | null;
    is_subject_sequence_completed: boolean | null;
    student_id: number;
    checklist_meta_id: number;
    created_at: string;
    updated_at: string;
}

export interface ChecklistMetaResponse {
    checklist_meta_id: number;
    student_id: number;
    highschool_type: HighschoolTypeEnum | null;
    is_subject_sequence_completed: boolean | null;
    created_at: string;
    updated_at: string;
}

export interface ChecklistScoreLabel {
    label: string;
    value: number;
}

// 체크리스트 질문 응답 타입
export interface ChecklistQuestionsResponse {
    questions: ChecklistQuestion[];
}

// 서버에서 내려오는 실제 질문 타입
export interface ChecklistQuestion {
    question_text: string;
    main_category_id: number;
    sub_category_id: number;
    is_active: boolean;
    checklist_question_id: number;
}

// 답변 전송용 타입
export interface ChecklistResponseItem {
    checklist_question_id: number;
    score: number; // 1~5
}

export interface ChecklistSubmitRequest {
    student_id: number;
    responses: ChecklistResponseItem[];
}

export interface ChecklistSubmitResponse {
    success: boolean;
    message?: string;
}