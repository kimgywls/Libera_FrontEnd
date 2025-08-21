import { BaseEntity, StudentBase, GradeSemester } from './common';

// 창의체험활동 항목
export interface CreativeActivity extends BaseEntity, StudentBase, GradeSemester {
    area: string; // 자율활동, 동아리활동, 진로활동 등
    details: string;
}

// 세부능력 및 특기사항
export interface DetailedAbility extends BaseEntity, StudentBase, GradeSemester {
    subject: string;
    content: string;
}

// 행동특성 및 종합의견
export interface BehavioralCharacteristic extends BaseEntity, StudentBase, GradeSemester {
    content: string;
}

// API 응답 구조
export interface ExtracurricularApiData {
    student_id: number;
    creative_activities: {
        items: CreativeActivity[];
        total: number;
    };
    detailed_abilities: {
        items: DetailedAbility[];
        total: number;
    };
    behavioral_characteristics: {
        items: BehavioralCharacteristic[];
        total: number;
    };
}

// 화면 표시용 요약 데이터
export interface ExtracurricularSummary {
    student_id: number;
    creative_activities: CreativeActivity[];
    detailed_abilities: DetailedAbility[];
    behavioral_characteristics: BehavioralCharacteristic[];
}

// 수정 폼 데이터 (모든 비교과 활동 타입 통합)
export interface EditFormData {
    id: number;
    grade?: number;
    area?: string;           // 창의체험활동용
    details?: string;        // 창의체험활동용
    semester?: string;       // 세부능력 및 특기사항용
    subject?: string;        // 세부능력 및 특기사항용
    content?: string;        // 세부능력 및 특기사항, 행동특성 및 종합의견용
} 