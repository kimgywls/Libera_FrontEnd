import { BaseEntity, StudentBase } from './common';

// checklist meta 관련 타입 및 enum
export enum HighschoolTypeEnum {
    일반고 = '일반고',
    자사자공고 = '자사/자공고',
    특수목적고 = '특수목적고',
    기타 = '기타',
}

export interface SaveChecklistMetaRequest extends BaseEntity, StudentBase {
    highschool_type: HighschoolTypeEnum | null;
    is_subject_sequence_completed: boolean | null;
    checklist_meta_id: number;
}

export interface ChecklistMetaResponse extends BaseEntity, StudentBase {
    checklist_meta_id: number;
    highschool_type: HighschoolTypeEnum | null;
    is_subject_sequence_completed: boolean | null;
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

export interface ChecklistSubmitRequest extends StudentBase {
    responses: ChecklistResponseItem[];
}

export interface ChecklistResultScores {
    "학업역량": number;
    "진로역량": number;
    "공동체역량": number;
    total: number;
}

export interface ChecklistSubmitResponse extends StudentBase {
    responses: Array<{
        checklist_question_id: number;
        score: number;
        question: ChecklistQuestion;
    }>;
    result_scores: ChecklistResultScores;
}

export interface ChecklistResultResponse extends StudentBase {
    result_scores: ChecklistResultScores;
}

// 상세 결과 타입 정의
export interface ChecklistDetailedResultResponse extends StudentBase {
    categories: {
        main_category_id: number;
        main_category_name: string;
        overall_score: number;
        sub_categories: {
            sub_category_id: number;
            sub_category_name: string;
            score: number;
            max_score: number;
            question_count: number;
        }[];
    }[];
}