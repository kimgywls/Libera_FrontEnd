import { extracurricularApiService } from '@/app/lib/api-client';

export interface CreateCreativeActivityData {
    grade: number;
    area: "자율활동" | "동아리활동" | "진로활동";
    details?: string | null;
    student_id: number;
}

export interface CreateDetailedAbilityData {
    grade: number;
    semester: "1" | "2" | "1,2";
    subject: string;
    content: string;
    student_id: number;
}

export interface CreateBehavioralCharacteristicData {
    grade: number;
    content: string;
    student_id: number;
}

export const createCreativeActivity = async (studentId: number, data: CreateCreativeActivityData) => {
    try {
        const res = await extracurricularApiService.post("/api/v1/extracurricular/creative-activities", {
            ...data,
            student_id: studentId
        });
        return res;
    } catch (error) {
        console.error('[createCreativeActivity] error:', error);
        throw error;
    }
};

export const createDetailedAbility = async (studentId: number, data: CreateDetailedAbilityData) => {
    try {
        const res = await extracurricularApiService.post("/api/v1/extracurricular/detailed-abilities", {
            ...data,
            student_id: studentId
        });
        return res;
    } catch (error) {
        console.error('[createDetailedAbility] error:', error);
        throw error;
    }
};

export const createBehavioralCharacteristic = async (studentId: number, data: CreateBehavioralCharacteristicData) => {
    try {
        const res = await extracurricularApiService.post("/api/v1/extracurricular/behavioral-characteristics", {
            ...data,
            student_id: studentId
        });
        return res;
    } catch (error) {
        console.error('[createBehavioralCharacteristic] error:', error);
        throw error;
    }
}; 